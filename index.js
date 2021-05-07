const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    hello: Int
  }
`;

const server = new ApolloServer({
  typeDefs,
  mocks: true,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
