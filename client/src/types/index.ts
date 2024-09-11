export type TransactionStatistics = Pick<Transaction, "category"> & {
  totalAmount: number;
};

export type Transaction = {
  _id: string;
  userId: string;
  amount: number;
  category: "saving" | "expense" | "investment";
  date: Date;
  description: string;
  location?: string;
  paymentType: string;
};

export type User = {
  _id: string;
  username: string;
  name: string;
  profilePicture: string;
};
