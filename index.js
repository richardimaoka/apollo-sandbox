const { ApolloServer, gql } = require("apollo-server");
const { GraphQLScalarType, Kind } = require("graphql");

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  scalar Date

  type SomeObj {
    i: Int
    s: String
  }

  type Event {
    id: ID!
    date: Date!
    someObj: SomeObj
  }

  type Query {
    events: [Event!]
  }
`;

const events = [
  {
    id: "The Awakening",
    date: new Date(),
  },
  {
    id: "The Awakening",
    date: new Date(),
  },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  //SomeObj: {
  //  i: () => 1,
  //  s: () => "str",
  //},
  Event: {
    someObj(parent, args, context, info) {
      console.log("----------------------------");
      console.log(parent);
      console.log(context);
      return {
        i: 1,
        s: "str",
      };
    },
  },
  Date: dateScalar,
  Query: {
    events: () => events,
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: function (r) {
    //console.log(r.req.complete);
    //console.log(r.req.rawHeaders);
    //console.log(r.req.url);
    //console.log(r.req.method);
    //console.log(r.req.statusCode);
    //console.log(r.req.params);
    //console.log(r.req.query);
    //console.log(r.req.body);
    console.log(r.req.body.operationName);
    return { a: "aaa", b: "bbb" };
  },
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
