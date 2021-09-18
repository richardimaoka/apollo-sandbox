import React from "react";
import { render } from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useMutation,
  useQuery,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

const GET_TODOS = gql`
  {
    todos {
      id
      type
    }
  }
`;

const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) {
      id
      text
    }
  }
`;

function Todos() {
  const { loading, error, data } = useQuery(GET_TODOS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.todos.map(({ id, type }) => {
    let input;

    return (
      <div key={id}>
        <p>{type}</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!input.value.trim()) {
              return;
            }

            input.value = "";
          }}
        >
          <input
            ref={(node) => {
              input = node;
            }}
          />
          <button type="submit">Update Todo</button>
        </form>
      </div>
    );
  });
}

function AddTodo() {
  let input;

  const [addTodo, { data, loading, error }] = useMutation(ADD_TODO, {
    //default values
    variables: {
      text: "placeholder",
      someOtherVariable: 1234,
    },
    onError: (error) => {
      console.log("onerror called\n", error);
      console.log(error.graphQLErrors);
      console.log(error.networkError.result.errors);
      console.log(error.networkError.message);
    },
  });
  if (error) {
    console.log("addTodError occured\n", error);
    console.log(error.graphQLErrors);
    return <div>Submission error</div>;
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo({ variables: { text: input.value } });
          if (!input.value.trim()) {
            return;
          }

          input.value = "";
        }}
      >
        <input
          ref={(node) => {
            input = node;
          }}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h2>Building Mutation components 🚀</h2>
        <AddTodo />
        <Todos />
      </div>
    </ApolloProvider>
  );
}

render(<App />, document.getElementById("root"));
