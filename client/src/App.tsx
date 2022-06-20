import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
  useApolloClient,
  useQuery,
} from "@apollo/client";
import "./App.css";

export const Internal = (): JSX.Element => {
  const { loading, error, data } = useQuery(gql`
    query ExampleQuery {
      feed {
        id
        name
        age
      }
    }
  `);
  const client = useApolloClient();

  if (loading) {
    console.log("loading");
    return <div>loading</div>;
  } else if (error) {
    console.log("error", error);
    return <div>error</div>;
  } else if (!data) {
    console.log("no data");
    return <></>;
  } else {
    console.log("success", data);
    console.log(client.cache);
    return <div>success</div>;
  }
};

function App() {
  const client = new ApolloClient({
    uri: "http://localhost:4000/",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Internal />
    </ApolloProvider>
  );
}

export default App;
