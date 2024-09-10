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
