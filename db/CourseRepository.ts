import { EntityRepository, Repository } from "typeorm";
import { Course } from "./entity/Course";

type NoId<T> = Omit<T, "id">;

@EntityRepository(Course)
export class CourseRepository extends Repository<Course> {
	async createAndSave(course: NoId<Course>): Promise<number> {
		let created = new Course();
		created.title = course.title!;
		await this.save(created);
		return created.id;
	}

	async getByTitle(title: string): Promise<Course | undefined> {
		return await this.findOne({ title });
	}
}
