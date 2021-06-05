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

const addressString = new GraphQLScalarType({
  name: "AddressString",
  description: "Single-line string representation of address",
  serialize(addressObj) {
    return `${addressObj.zipCode} ${addressObj.prefecture} ${addressObj.city} ${addressObj.street}`; // Convert outgoing Date to integer for JSON
  },
  parseValue(addressString) {
    addressStringParts = addressString.split(" ");
    if (addressStringParts.length !== 4) {
      throw new Error(
        `parsing addressString ${addressString} got a non-4 length = ${addressString.length}`
      );
    } else {
      return {
        zipCode: addressStringParts[0],
        prefecture: addressStringParts[1],
        city: addressStringParts[2],
        street: addressStringParts[3],
      };
    }
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});

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
  AddressString: addressString,
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
