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
      const todos = [];
      cache.forEach((type, id) => todos.push({ type, id }));
      return todos;
    },
    todo: (_, { id }) => {
      return { id, type: cache.get(id) };
    },
  },
  Mutation: {
    addTodo: (_, { type }) => {
      console.log("addTodo received");
      const id = generate();
      const todo = { type, id };
      cache.set(id, type);
      return todo;
    },
    updateTodo: (_, { type, id }) => {
      const todo = { type, id };
      cache.set(id, type);
      return todo;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (err) => {
    console.log("formatError is called on ", err);
    return err;
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
