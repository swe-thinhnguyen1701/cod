import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from "@apollo/client";
import { Outlet } from "react-router-dom";

const httpLink = createHttpLink({
  uri: "/graphql"
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

function App() {

  return (
    <ApolloProvider client={client}>
      <Outlet />
    </ApolloProvider>
  )
}

export default App
