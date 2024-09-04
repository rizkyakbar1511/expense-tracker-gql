import { mergeResolvers } from "@graphql-tools/merge";
import useResolver from "./user.resolver";
import transactionResolver from "./transaction.resolver";

const mergedResolvers = mergeResolvers([useResolver, transactionResolver]);

export default mergedResolvers;
