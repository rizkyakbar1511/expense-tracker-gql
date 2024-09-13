import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { BackgroundLines } from "./components/background-lines.tsx";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./index.css";

const client = new ApolloClient({
  uri:
    import.meta.env.VITE_NODE_ENV === "development" ? "http://localhost:4000/graphql" : "/graphql",
  cache: new InMemoryCache(), //Apollo client uses to cache query results after fetching them.
  credentials: "include", // this tells Apollo client to send cookies along with every request to the server.
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <BackgroundLines className="bg-black">
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </BackgroundLines>
    </BrowserRouter>
  </StrictMode>
);
