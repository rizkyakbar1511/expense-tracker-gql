import { mergeResolvers } from "@graphql-tools/merge";
import useResolver from "./user/resolver";
import transactionResolver from "./transaction/resolver";

const resolvers = mergeResolvers([useResolver, transactionResolver]);

export default resolvers;
