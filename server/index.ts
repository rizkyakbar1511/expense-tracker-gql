import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";
import http from "http";
import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import connectMongo from "connect-mongodb-session";
import { buildContext } from "graphql-passport";
import path from "path";

import resolvers from "./modules/resolvers.js";
import typeDefs from "./modules/typedefs.js";
import { connectDB } from "./utils/connectDB.js";
import { passportConfig } from "./passport/passport.config.js";
import job from "./cron.js";

(async () => {
  dotenv.config();
  passportConfig();
  job.start();

  const __pathdirname = path.resolve();
  const PORT = process.env.PORT || 4000;
  const app = express();

  // Our httpServer handles incoming requests to our Express app.

  // Below, we tell Apollo Server to "drain" this httpServer,

  // enabling our servers to shut down gracefully.

  const httpServer = http.createServer(app);
  const MongoDBStore = connectMongo(session);

  const store = new MongoDBStore({
    uri: process.env.MONGO_URI!,
    collection: "sessions",
  });

  store.on("error", (error) => {
    console.log(error);
  });

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false, // this option specifies whether to save the session to the store on every request
      saveUninitialized: false, // option specifies whether to save uninitialized sessions,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true, // this option prevents the Cross-Site Scripting (XSS) attacks
      },
      store,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    introspection: process.env.NODE_ENV !== "production",
  });

  await server.start();
  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      origin: "http://localhost:3000",
      credentials: true,
    }),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => buildContext({ req, res }),
    })
  );

  app.use(express.static(path.join(__pathdirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__pathdirname, "../client/dist", "index.html"));
  });

  await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
  await connectDB();

  console.log(`🚀 Server ready at port ${PORT}`);
})();
