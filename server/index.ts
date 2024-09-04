import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";
import http from "http";
import express from "express";
import dotenv from "dotenv";

import mergedResolvers from "./resolvers";
import mergedTypeDefs from "./typeDefs";
import { connectDB } from "./db/connectDB";

interface MyContext {}

dotenv.config();
const PORT = process.env.PORT || 4000;
const app = express();
// Our httpServer handles incoming requests to our Express app.

// Below, we tell Apollo Server to "drain" this httpServer,

// enabling our servers to shut down gracefully.

const httpServer = http.createServer(app);

const server = new ApolloServer<MyContext>({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  "/graphql",

  cors<cors.CorsRequest>(),

  express.json(),

  expressMiddleware(server, {
    context: async ({ req }) => ({ req }),
  })
);

await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
await connectDB();

console.log(`🚀 Server ready at port ${PORT}`);
