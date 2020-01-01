import express from "express";
import { createServer } from "http";
import expressGraphQL from "express-graphql";
import { buildSchema } from "graphql";

// Can reuse server instance with createServer
// https://stackoverflow.com/questions/17696801/express-js-app-listen-vs-server-listen

// GraphQL schema
const schema = buildSchema(`
    type Query {
        message: String
    }
`);

// Root resolver
const root = {
	message: () => "Hello World!"
};

const app = express();
const dev = process.env.NODE_ENV !== "production";

app.get("/", (req, res) => {
	res.send("Hello World! " + (dev ? "dev" : "prod"));
});

app.use(
	"/graphql",
	expressGraphQL({
		schema: schema,
		rootValue: root,
		graphiql: true
	})
);

createServer(app).listen(3574, () => {
	console.log("Listening on port 3574!");
});
