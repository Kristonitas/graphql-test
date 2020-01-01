import { gql } from "apollo-server";
import { QueryResolvers, MutationResolvers } from "./generated/types";
import * as db from "../db/index";

const typeDefs = gql`
	type Query {
		course(id: Int!): Course
		courses(topic: String!): [Course]
	}
	type Mutation {
		updateCourseTopic(id: Int!, topic: String!): Course
	}
	type Course {
		id: Int
		title: String
		author: String
		description: String
		topic: String
		url: String
	}
`;

const coursesData = [
	{
		title: "The Complete Node.js Developer Course",
		author: "Andrew Mead, Rob Percival",
		description:
			"Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!",
		topic: "Node.js",
		url: "https://codingthesmartway.com/courses/nodejs/"
	},
	{
		title: "Node.js, Express & MongoDB Dev to Deployment",
		author: "Brad Traversy",
		description:
			"Learn by example building & deploying real-world Node.js applications from absolute scratch",
		topic: "Node.js",
		url: "https://codingthesmartway.com/courses/nodejs-express-mongodb/"
	},
	{
		title: "JavaScript: Understanding The Weird Parts",
		author: "Anthony Alicea",
		description:
			"An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.",
		topic: "JavaScript",
		url: "https://codingthesmartway.com/courses/understand-javascript/"
	}
];

db.execute(async () => {
	const courseRep = db.getCourseRepository();
	const entries = await courseRep.count();
	if (entries > 0) {
		return;
	}

	for (const c of coursesData) {
		const entity = await courseRep.create(c);
		await courseRep.save(entity);
	}
});

const course: QueryResolvers["course"] = async (parent, args) => {
	const { id } = args;

	return await db.execute(async () => {
		const courseRep = db.getCourseRepository();

		const course = await courseRep.findOne(id);

		// TODO: why graphql wants non-nullable return?
		return course!;
	});
};

const courses: QueryResolvers["courses"] = async (parent, args) => {
	const { topic } = args;

	if (topic == undefined) {
		return [];
	}

	return await db.execute(async () => {
		const courseRep = db.getCourseRepository();

		const courses = await courseRep.find({ topic });

		return courses;
	});
};

const updateCourseTopic: MutationResolvers["updateCourseTopic"] = async (
	parent,
	args
) => {
	const { id, topic } = args;

	return await db.execute(async () => {
		const courseRep = db.getCourseRepository();

		const course = await courseRep.findOne(id);

		if (!course) {
			// TODO: why graphql wants non-nullable return?
			return course!;
		}

		course.topic = topic;
		return await courseRep.save(course);
	});
};

const resolvers = {
	Query: {
		course,
		courses
	},
	Mutation: {
		updateCourseTopic
	}
};

export { typeDefs, resolvers };
