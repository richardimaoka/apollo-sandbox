import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
  useApolloClient,
  useQuery,
} from "@apollo/client";
import "./App.css";

interface QueryData {
  feed: {
    id: string;
    name: string;
    age: number;
  }[];
}

export const Internal = (): JSX.Element => {
  const { loading, error, data } = useQuery<QueryData>(gql`
    query ExampleQuery {
      feed(offset: 40, limit: 20) {
        id
        name
        age
        age
      }
    }
  `);
  const {} = useQuery(gql`
    query ExampleQuery {
      feed(offset: 20, limit: 20) {
        id
        name
        age
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
    return (
      <div>
        {data.feed.map((n) => (
          <div key={n.id}>
            <div>{n.id}</div>
            <div>{n.name}</div>
            <div>{n.age}</div>
            <div>========</div>
          </div>
        ))}
      </div>
    );
  }
};

function App() {
  const client = new ApolloClient({
    uri: "http://localhost:4000/",
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            feed: {
              // Don't cache separate results based on
              // any of this field's arguments.
              keyArgs: ["limit"],
              read(existing) {
                console.log("read function is called", existing);
                return existing;
              },
            },
          },
        },
      },
    }),
  });

  return (
    <ApolloProvider client={client}>
      <Internal />
    </ApolloProvider>
  );
}

export default App;
