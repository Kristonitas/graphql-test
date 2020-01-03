import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config();

import { createConnection, Connection } from "typeorm";
import { Course } from "./entity/Course";
export { Course } from "./entity/Course";
import config from "./ormconfig";

const execute = async <T>(func: () => Promise<T>): Promise<T> => {
	const connection = await createConnection(config);

	const result = await func();
	connection.close();
	return result;
};

export { execute };
