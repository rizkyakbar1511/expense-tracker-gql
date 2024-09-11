import Transaction from "../../models/transaction.model";
import { Resolvers, TransactionDbObject } from "../../types/resolver.types";

const transactionResolver: Resolvers = {
  Query: {
    transactions: async (_, __, ctx) => {
      try {
        if (!ctx.getUser()) throw new Error("Unauthorized");
        const userId = await ctx.getUser()._id;

        const transactions = (await Transaction.find({ userId })) as TransactionDbObject[];
        return transactions;
      } catch (error) {
        console.error("Error in transactions query : ", error);
        throw new Error("Internal server error");
      }
    },
    transaction: async (_, { transactionId }) => {
      try {
        const transaction = (await Transaction.findById(transactionId)) as TransactionDbObject;
        return transaction;
      } catch (error) {
        console.error("Error in transaction query : ", error);
        throw new Error("Internal server error");
      }
    },
    categoryStatistics: async (_, __, ctx) => {
      if (!ctx.getUser()) throw new Error("Unauthorized");

      const userId = await ctx.getUser()._id;
      const transactions = await Transaction.find({ userId });
      const categoryMap: Record<string, number> = {};

      transactions.forEach((transaction) => {
        if (!categoryMap[transaction.category]) {
          categoryMap[transaction.category] = 0;
        }
        categoryMap[transaction.category] += transaction.amount;
      });

      return Object.entries(categoryMap).map(([category, totalAmount]) => ({
        category,
        totalAmount,
      }));
    },
  },
  Mutation: {
    createTransaction: async (_, { input }, ctx): Promise<TransactionDbObject> => {
      try {
        const newTransaction = new Transaction({ ...input, userId: ctx.getUser()._id });
        await newTransaction.save();
        return newTransaction as TransactionDbObject;
      } catch (error) {
        console.error("Error in transaction mutation : ", error);
        throw new Error("Internal server error");
      }
    },

    updateTransaction: async (_, { input }): Promise<TransactionDbObject> => {
      try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(input.transactionId, input, {
          new: true,
        });
        return updatedTransaction as TransactionDbObject;
      } catch (error) {
        console.error("Error updating transaction : ", error);
        throw new Error("Internal server error");
      }
    },
    deleteTransaction: async (_, { transactionId }): Promise<TransactionDbObject> => {
      try {
        const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);
        return deletedTransaction as TransactionDbObject;
      } catch (error) {
        console.error("Error deleting transaction : ", error);
        throw new Error("Internal server error");
      }
    },
  },
  //TODO => ADD TRANSACTION/USER RELATIONSHIP
};

export default transactionResolver;
