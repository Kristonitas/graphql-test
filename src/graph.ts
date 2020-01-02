import { gql } from "apollo-server";
import { QueryResolvers, MutationResolvers } from "./generated/types";
import * as db from "../db/index";

const typeDefs = gql`
	type Query {
		course(id: ID!): Course
		courses(topic: String!): [Course]
	}
	type Mutation {
		updateCourseTopic(id: ID!, topic: String!): Course
	}
	type Course {
		id: ID
		title: String
		author: String
		description: String
		topic: String
		url: String
	}
`;

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
