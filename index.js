const { ApolloServer, gql } = require("apollo-server");
const { GraphQLScalarType, Kind } = require("graphql");

// Basic schema
const typeDefs = gql`
  scalar AddressString

  type User {
    name: String
    address: AddressString
  }

  type Query {
    users: [User]
  }
`;

const addressObj1 = {
  zipCode: "123-0035",
  prefecture: "東京都",
  city: "江戸川区",
  street: "江戸川町4-1-1",
};

const addressObj2 = {
  zipCode: "123-3541",
  prefecture: "東京都",
  city: "墨田区",
  street: "墨田町2-28-1",
};

const users = [
  { name: "高山高矢", address: addressObj1 },
  { name: "大崎大五郎", address: addressObj2 },
];

const resolvers = {
  Query: {
    users() {
      return users;
    },
  },
  User: {
    name(parent) {
      return parent.name;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
