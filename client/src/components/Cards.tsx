import { useQuery } from "@apollo/client";
import Card from "./Card";
import { GET_TRANSACTIONS } from "@/graphql/queries/transaction.query";
import { Transaction, User } from "@/types";
import { GET_AUTH_USER } from "@/graphql/queries/user.query";

const Cards = () => {
  const { data, loading, error } = useQuery(GET_TRANSACTIONS);
  const { data: userData } = useQuery<{ authUser: User }>(GET_AUTH_USER);

  /**
   * Below query can be used for fetching user and transactions (relationships)
   */
  // const { data: userAndTransactions } = useQuery(GET_USER_AND_TRANSACTIONS, {
  //   variables: {
  //     userId: userData?.authUser?._id,
  //   },
  // });

  if (error) return <p>Error : {error.message}</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div className="w-full px-10 min-h-[40vh]">
      <p className="text-5xl font-bold text-center my-10">History</p>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20">
        {data?.transactions.map((transaction: Transaction) => (
          <Card
            key={transaction._id}
            transaction={transaction}
            profilePicture={userData?.authUser.profilePicture}
          />
        ))}
        {data?.transactions.length === 0 && (
          <p className="text-2xl font-bold text-center w-full">
            No transactions history were found
          </p>
        )}
      </div>
    </div>
  );
};
export default Cards;
