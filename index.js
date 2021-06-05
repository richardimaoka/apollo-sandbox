const { ApolloServer, gql } = require("apollo-server");
const { GraphQLScalarType, Kind } = require("graphql");

// Basic schema
const typeDefs = gql`
  scalar Odd

  type MyType {
    oddValue: Odd
  }

  type Query {
    my: MyType
  }
`;

// Validation function
function oddValue(value) {
  return value % 2 === 1 ? value : null;
}

const myt = {
  oddValue: 11,
};
const resolvers = {
  Odd: new GraphQLScalarType({
    name: "Odd",
    description: "Odd custom scalar type",
    parseValue: oddValue,
    serialize: oddValue,
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return oddValue(parseInt(ast.value, 10));
      }
      return null;
    },
  }),
  Query: {
    my() {
      return myt;
    },
  },
  MyType: {
    oddValue(parent) {
      return parent.oddValue * 3;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
