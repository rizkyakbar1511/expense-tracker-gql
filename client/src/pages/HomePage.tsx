import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { MdLogout } from "react-icons/md";
import TransactionForm from "@/components/TransactionForm";
import Cards from "@/components/Cards";
import { useMutation, useQuery } from "@apollo/client";
import { LOGOUT } from "@/graphql/mutations/user.mutation";
import toast from "react-hot-toast";
import { GET_TRANSACTION_STATISTICS } from "@/graphql/queries/transaction.query";
import { TransactionStatistics, User } from "@/types";
import { useEffect, useState } from "react";
import { GET_AUTH_USER } from "@/graphql/queries/user.query";

ChartJS.register(ArcElement, Tooltip, Legend);

//CHART DATA REFERENCE
// const chartData = {
//   labels: ["Saving", "Expense", "Investment"],
//   datasets: [
//     {
//       label: "%",
//       data: [13, 8, 3],
//       backgroundColor: ["rgba(75, 192, 192)", "rgba(255, 99, 132)", "rgba(54, 162, 235)"],
//       borderColor: ["rgba(75, 192, 192)", "rgba(255, 99, 132)", "rgba(54, 162, 235, 1)"],
//       borderWidth: 1,
//       borderRadius: 30,
//       spacing: 10,
//       cutout: 130,
//     },
//   ],
// };

type ChartData = {
  labels: ("saving" | "expense" | "investment")[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: (string | undefined)[];
    borderColor: (string | undefined)[];
    borderWidth: number;
    borderRadius: number;
    spacing: number;
    cutout: number;
  }[];
};

const HomePage = () => {
  const [logout, { loading, client }] = useMutation(LOGOUT, {
    refetchQueries: [{ query: GET_AUTH_USER }],
  });

  const { data } = useQuery<{ categoryStatistics: TransactionStatistics[] }>(
    GET_TRANSACTION_STATISTICS
  );
  const { data: userData } = useQuery<{ authUser: User }>(GET_AUTH_USER);

  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: "IDR",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
        borderRadius: 30,
        spacing: 10,
        cutout: 130,
      },
    ],
  });

  useEffect(() => {
    if (data?.categoryStatistics) {
      const categories = data.categoryStatistics.map(({ category }) => category);
      const totalAmounts = data.categoryStatistics.map(({ totalAmount }) => totalAmount);
      const colors = new Map([
        ["saving", "rgba(75, 192, 192)"],
        ["expense", "rgba(255, 99, 132)"],
        ["investment", "rgba(54, 162, 235)"],
      ]);
      const bgColors = categories.map((category) => colors.get(category));

      setChartData((prev) => ({
        labels: categories,
        datasets: [
          {
            ...prev.datasets[0],
            data: totalAmounts,
            backgroundColor: bgColors,
            borderColor: bgColors,
          },
        ],
      }));
    }
  }, [data]);

  const handleLogout = async () => {
    try {
      await logout();
      client.resetStore();
    } catch (error) {
      console.error("Error :", error);
      toast.error((error as Error).message);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center">
        <div className="flex items-center">
          <p className="md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text">
            Spend wisely, track wisely
          </p>
          <img
            src={userData?.authUser.profilePicture}
            className="w-11 h-11 rounded-full border cursor-pointer"
            alt="Avatar"
          />
          {!loading && (
            <MdLogout className="mx-2 w-5 h-5 cursor-pointer text-white" onClick={handleLogout} />
          )}
          {/* loading spinner */}
          {loading && (
            <div className="w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin"></div>
          )}
        </div>
        <div className="flex flex-wrap w-full justify-center items-center gap-6">
          {(data?.categoryStatistics.length ?? 0) > 0 && (
            <div className="h-[330px] w-[330px] md:h-[360px] md:w-[360px]  ">
              <Doughnut data={chartData} />
            </div>
          )}
          <TransactionForm />
        </div>
        <Cards />
      </div>
    </>
  );
};
export default HomePage;
