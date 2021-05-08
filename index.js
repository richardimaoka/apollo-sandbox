const { MockList, ApolloServer, gql } = require("apollo-server");
const casual = require("casual");

const typeDefs = gql`
  type Person {
    name: String
    age: Int
    friends: [Person]
    listOfLists: [[Int]]
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
    // a list of length between 2 and 6 (inclusive), doesn't need to specify the type
    friends: () => new MockList([2, 6]),
    // a list of three lists each with two items: [[1, 1], [2, 2], [3, 3]]
    listOfLists: () => new MockList(3, () => new MockList(2)),
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
