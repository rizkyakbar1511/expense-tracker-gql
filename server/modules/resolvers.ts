import { mergeResolvers } from "@graphql-tools/merge";
import useResolver from "./user/resolver.js";
import transactionResolver from "./transaction/resolver.js";

const resolvers = mergeResolvers([useResolver, transactionResolver]);

export default resolvers;
