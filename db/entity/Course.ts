import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Course extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column({ length: 100 })
	title!: string;

	@Column({ length: 100 })
	author!: string;

	@Column({ length: 100 })
	description!: string;

	@Column({ length: 100 })
	topic!: string;

	@Column({ length: 100 })
	url!: string;
}
