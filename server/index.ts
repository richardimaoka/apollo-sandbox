const { ApolloServer, gql } = require("apollo-server");
const LRU = require("lru-cache");
const { generate } = require("shortid");

// Construct a schema, using GraphQL schema language
const typeDefs = `
  type Query {
    todos: [Todo]
		todo(id: String!): Todo
  }

	type Todo {
		id: String!
		type: String!
	}

	type Mutation {
		addTodo(type: String!): Todo
		updateTodo(id: String!, type: String!): Todo
	}
`;

const cache = new LRU({ max: 50, maxAge: 1000 * 60 * 60 });

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    todos: () => {
      const todos: any[] = [];
      cache.forEach((type: string, id: string) => todos.push({ type, id }));
      return todos;
    },
    todo: (_: any, { id }: { id: string }) => {
      return { id, type: cache.get(id) };
    },
  },
  Mutation: {
    addTodo: async (_: any, { type }: { type: string }) => {
      await sleep(1000);
      function sleep(ms: number) {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
      }
      console.log("addTodo received");
      const id = generate();
      const todo = { type, id };
      cache.set(id, type);
      return todo;
    },
    updateTodo: (_: any, { type, id }: { type: string; id: string }) => {
      const todo = { type, id };
      cache.set(id, type);
      return todo;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (err: Error) => {
    console.log("formatError is called on ", err);
    return err;
  },
});

server.listen().then(({ url }: { url: string }) => {
  console.log(`🚀 Server ready at ${url}`);
});
