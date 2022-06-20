import { ApolloServer, gql } from "apollo-server";

// GraphQLスキーマの定義
const typeDefs = gql`
  type Query {
    feed(offset: Int, limit: Int): [Node]
  }

  type Node {
    id: ID
    name: String
    age: Int
  }
`;

// サンプルデータの定義
const nodes = [
  {
    id: "657w3890-rotghj",
    name: "Kate Chopin",
  },
  {
    id: "124saer084-rotsaer7hj",
    name: "Jasmin Jigsaw",
  },
];

// リゾルバーの定義
const resolvers = {
  Query: {
    feed() {
      return nodes;
    },
  },
};

// サーバーの起動
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
