import { ConnectionOptions } from "typeorm";

import { Course } from "./entity/Course";

const config: ConnectionOptions = ((): ConnectionOptions => {
	// const prod = true;
	const prod = process.env.NODE_ENV === "production";

	const defaults: Partial<ConnectionOptions> = {
		entities: [Course],
		cli: {
			entitiesDir: "db/entity",
			migrationsDir: "db/migration",
			subscribersDir: "db/subscriber"
		}
	};

	if (prod) {
		const {
			mysql_host,
			mysql_user,
			mysql_database,
			mysql_password
		} = process.env;

		return {
			...defaults,
			type: "mysql",
			host: mysql_host,
			username: mysql_user,
			password: mysql_password,
			database: mysql_database,
			synchronize: true,
			logging: false
		};
	} else {
		return {
			...defaults,
			type: "sqlite",
			database: "dev.sqlite",
			synchronize: true,
			logging: true
		};
	}
})();

export default config;
