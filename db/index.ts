import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config();

import { createConnection, Connection } from "typeorm";
import { Course } from "./entity/Course";
export { Course } from "./entity/Course";
import { CourseRepository } from "./CourseRepository";
export { CourseRepository } from "./CourseRepository";
import config from "./ormconfig";

let _connection: Connection;
const connect = async () => {
	_connection = await createConnection(config);
};

const close = async () => {
	await _connection.close();
};

const execute = async <T>(func: () => Promise<T>): Promise<T> => {
	await connect();
	const result = await func();
	await close();
	return result;
};

const connected = () => {
	return typeof _connection !== "undefined";
};

const getCourseRepository = (): CourseRepository => {
	return _connection.getCustomRepository(CourseRepository);
};

export { execute, connected, getCourseRepository };
