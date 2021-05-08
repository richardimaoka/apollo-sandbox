const { ApolloServer, gql } = require("apollo-server");
const casual = require("casual");

const typeDefs = gql`
  type Person {
    name: String
    age: Int
  }
  type Query {
    hello: String
    resolved: String
    persons: [Person]
  }
`;

const resolvers = {
  Query: {
    resolved: () => "Resolved",
  },
};

const mocks = {
  Int: () => 6,
  Float: () => 22.1,
  String: () => "Hello",
  Person: () => ({
    name: casual.name,
    age: () => casual.integer(0, 120),
  }),
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  mocks,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
