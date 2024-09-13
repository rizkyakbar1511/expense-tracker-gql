import { genSalt, hash } from "bcrypt-ts";
import User from "../../models/user.model.js";
import { Resolvers, TransactionDbObject, UserDbObject } from "../../types/resolver.types.js";
import Transaction from "../../models/transaction.model.js";

const userResolver: Resolvers = {
  Query: {
    authUser: async (_, __, ctx) => {
      try {
        const user = await ctx.getUser();
        return user;
      } catch (error) {
        console.error("Error in authUser :", error);
        throw new Error((error as Error).message || "Internal server error");
      }
    },
    user: async (_, { userId }): Promise<UserDbObject> => {
      try {
        const userDoc = (await User.findById(userId)) as UserDbObject;
        return userDoc;
      } catch (error) {
        console.error("Error in user query :", error);
        throw new Error((error as Error).message || "Internal server error");
      }
    },
  },
  Mutation: {
    signUp: async (_, { input }, ctx): Promise<UserDbObject> => {
      try {
        const { username, password, name, gender } = input;

        if (!username || !password || !name || !gender) throw new Error("All fields are required");

        const existingUser = await User.findOne({ username });

        if (existingUser) throw new Error("User already exists");

        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);
        const profilePicture = `https://avatar.iran.liara.run/public/${
          gender === "male" ? "boy" : "girl"
        }?username=${username}`;

        const newUser = new User({
          name,
          username,
          password: hashedPassword,
          gender,
          profilePicture,
        });

        await newUser.save();
        await ctx.login(newUser);
        return newUser as UserDbObject;
      } catch (error) {
        console.error("Error in 'signUp :", error);
        throw new Error((error as Error).message || "Internal server error");
      }
    },
    login: async (_, { input }, ctx) => {
      try {
        const { username, password } = input;
        const { user } = await ctx.authenticate("graphql-local", { username, password });

        await ctx.login(user);
        return user;
      } catch (error) {
        console.error("Error in 'login :", error);
        throw new Error((error as Error).message || "Internal server error");
      }
    },
    logout: async (_, __, ctx) => {
      try {
        await ctx.logout();
        ctx.req.session.destroy((err: unknown) => {
          if (err) throw err;
        });
        ctx.res.clearCookie("connect.sid");
        return { message: "Logged out successfully" };
      } catch (error) {
        console.error("Error in 'logout :", error);
        throw new Error((error as Error).message || "Internal server error");
      }
    },
  },
  User: {
    transactions: async (parent, _, __) => {
      try {
        const transactions = (await Transaction.find({
          userId: parent._id,
        })) as TransactionDbObject[];
        return transactions;
      } catch (error) {
        console.log("Error in 'user.transactions resolver' :", error);
        throw new Error((error as Error).message || "Internal server error");
      }
    },
  },
};

export default userResolver;
