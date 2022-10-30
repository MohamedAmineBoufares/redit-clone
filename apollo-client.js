import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://luocheng.stepzen.net/api/willing-mouse/__graphql",
  headers: {
    Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
  },
  cache: new InMemoryCache(),
});

export default client;
