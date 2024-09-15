import { createRequire } from "module";
import passport from "passport";
import { compare } from "bcrypt-ts";
import { GraphQLLocalStrategy } from "graphql-passport";

import User from "../models/user.model.js";

const require = createRequire(import.meta.url);
const bcrypt = require("bcrypt-ts");

export const passportConfig = async () => {
  passport.serializeUser((user, done) => {
    console.log("🚀 ~ passport.serializeUser ~ user:", user);

    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    console.log("🚀 ~ passport.deserializeUser ~ id:", id);

    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  passport.use(
    new GraphQLLocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username });

        if (!user) throw new Error("Invalid username or password");

        const validPassword = await bcrypt.compare(password as string, user.password);

        if (!validPassword) throw new Error("Invalid username or password");

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );
};
