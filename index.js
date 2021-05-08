const { MockList, ApolloServer, gql } = require("apollo-server");
const casual = require("casual");

const typeDefs = gql`
  type Person {
    age: Int
    name: String
    paginatedFriends(numPages: Int): [Person]
  }
  type Query {
    hello: String
    resolved: Int
    persons: [Person]
  }
`;

const resolvers = {
  Query: {
    resolved: () => "Resolved",
  },
};

const PAGE_SIZE = 10;
const mocks = {
  Int: () => 6,
  Float: () => 22.1,
  String: () => "Hello",
  Person: () => ({
    // the number of friends in the list now depends on numPages
    paginatedFriends: (parent, args, context, info) =>
      new MockList(args.numPages * PAGE_SIZE),
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
