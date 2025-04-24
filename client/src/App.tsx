import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from "@apollo/client";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import { Box } from "@chakra-ui/react";

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
      <Box position="relative">
        <Box position="fixed" top={0} zIndex="100" width="100%">
          <NavBar />
        </Box>
        <Box mt={{base: "50px", lg: "90px"}}>
          <Outlet />
        </Box>
      </Box>
    </ApolloProvider>
  )
}

export default App
