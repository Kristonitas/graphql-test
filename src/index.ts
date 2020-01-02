import { ApolloServer } from "apollo-server";
import { typeDefs, resolvers } from "./graph";
import mock from "./mock";

const server = new ApolloServer({
	typeDefs,
	resolvers
});

mock();

server
	.listen({
		port: 3574
	})
	.then(({ url }) => {
		console.log(`🚀 Server ready at ${url}`);
	});
