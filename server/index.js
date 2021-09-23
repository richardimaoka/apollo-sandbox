"use strict";
var _a = require("apollo-server"), ApolloServer = _a.ApolloServer, gql = _a.gql;
var LRU = require("lru-cache");
var generate = require("shortid").generate;
// Construct a schema, using GraphQL schema language
var typeDefs = "\n  type Query {\n    todos: [Todo]\n\t\ttodo(id: String!): Todo\n  }\n\n\ttype Todo {\n\t\tid: String!\n\t\ttype: String!\n\t}\n\n\ttype Mutation {\n\t\taddTodo(type: String!): Todo\n\t\tupdateTodo(id: String!, type: String!): Todo\n\t}\n";
var cache = new LRU({ max: 50, maxAge: 1000 * 60 * 60 });
// Provide resolver functions for your schema fields
var resolvers = {
    Query: {
        todos: function () {
            var todos = [];
            cache.forEach(function (type, id) { return todos.push({ type: type, id: id }); });
            return todos;
        },
        todo: function (_, _a) {
            var id = _a.id;
            return { id: id, type: cache.get(id) };
        },
    },
    Mutation: {
        addTodo: function (_, _a) {
            var type = _a.type;
            console.log("addTodo received");
            var id = generate();
            var todo = { type: type, id: id };
            cache.set(id, type);
            return todo;
        },
        updateTodo: function (_, _a) {
            var type = _a.type, id = _a.id;
            var todo = { type: type, id: id };
            cache.set(id, type);
            return todo;
        },
    },
};
var server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    formatError: function (err) {
        console.log("formatError is called on ", err);
        return err;
    },
});
server.listen().then(function (_a) {
    var url = _a.url;
    console.log("\uD83D\uDE80 Server ready at " + url);
});
