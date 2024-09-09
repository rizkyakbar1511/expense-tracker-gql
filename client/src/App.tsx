import { Navigate, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import TransactionPage from "./pages/TransactionPage";
import Header from "./components/Header";
import { useQuery } from "@apollo/client";
import { GET_AUTH_USER } from "./graphql/queries/user.query";
import { Toaster } from "react-hot-toast";

function App() {
  const { data } = useQuery(GET_AUTH_USER);

  return (
    <>
      {data?.authUser && <Header />}
      <Routes>
        <Route path="/" element={data?.authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/transaction/:id" element={<TransactionPage />} />
        <Route path="/login" element={!data?.authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
