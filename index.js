const { ApolloServer, gql } = require("apollo-server");
const { GraphQLScalarType, Kind } = require("graphql");

// Basic schema
const typeDefs = gql`
  scalar Odd

  type MyType {
    oddValue: Odd
  }
`;

// Validation function
function oddValue(value) {
  return value % 2 === 1 ? value : null;
}

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
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
