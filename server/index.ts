const { ApolloServer, gql } = require("apollo-server");
const fs = require("fs");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  ${fs.readFileSync(__dirname.concat("/schema.graphql"), "utf8")}
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers, mocks: true });

// The `listen` method launches a web server.
server.listen().then(({ url }: any) => {
  console.log(`🚀  Server ready at ${url}`);
});
