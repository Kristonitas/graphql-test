import express from "express";
import { createServer } from "http";

// Can reuse server instance with createServer
// https://stackoverflow.com/questions/17696801/express-js-app-listen-vs-server-listen

const app = express();
const dev = process.env.NODE_ENV !== "production";

app.get("/", (req, res) => {
	res.send("Hello World! " + (dev ? "dev" : "prod"));
});

createServer(app).listen(3574, () => {
	console.log("Listening on port 3574!");
});
