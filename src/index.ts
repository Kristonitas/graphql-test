import { ApolloServer } from "apollo-server";
import { typeDefs, resolvers } from "./graph";

const server = new ApolloServer({
	typeDefs,
	resolvers
});

server
	.listen({
		port: 3574
	})
	.then(({ url }) => {
		console.log(`🚀 Server ready at ${url}`);
	});
