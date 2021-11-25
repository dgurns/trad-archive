import {
	Resolver,
	Query,
	Mutation,
	Ctx,
	Arg,
	Root,
	FieldResolver,
} from "type-graphql";
import { FindManyOptions, In } from "typeorm";

import { CustomContext } from "../middleware/context";
import { Person } from "../models/entities/Person";
import { User } from "../models/User";
import {
	VerificationRequest,
	VerificationRequestStatus,
} from "../models/VerificationRequest";
import { Tag } from "../models/Tag";
import {
	PeopleInput,
	CreatePersonInput,
	UpdatePersonInput,
} from "./PersonResolverTypes";
import EntityService from "../services/Entity";
import { SortBy } from "./commonTypes";

@Resolver(() => Person)
export class PersonResolver {
	@Query(() => Person, { nullable: true })
	person(
		@Arg("id", { nullable: true }) id: string,
		@Arg("slug", { nullable: true }) slug: string
	) {
		if (!id && !slug) {
			throw new Error("Must provide an ID or slug");
		}
		const whereOptions = id ? { id } : { slug };
		return Person.findOne({
			where: whereOptions,
		});
	}

	@Query(() => [Person])
	people(@Arg("input") input: PeopleInput) {
		const { take, skip, sortBy } = input;
		const options: FindManyOptions<Person> = {
			take,
			skip,
			order: {},
		};
		switch (sortBy) {
			case SortBy.AToZ:
				if (options.order) {
					options.order.name = "ASC";
				}
				break;
			default:
				if (options.order) {
					options.order.createdAt = "DESC";
				}
		}
		return Person.find(options);
	}

	@Mutation(() => Person)
	async createPerson(
		@Arg("input") input: CreatePersonInput,
		@Ctx() ctx: CustomContext
	) {
		const { slug, aliases, description, firstName, middleName, lastName } =
			input;

		if (!firstName || !lastName || !slug) {
			throw new Error(
				"A new Person must have at least a firstName, lastName, and slug"
			);
		}
		const user = await User.findOne({ where: { id: ctx.userId } });
		if (!user) {
			throw new Error("You must be logged in to create a Person");
		}

		const name = middleName
			? `${firstName} ${middleName} ${lastName}`
			: `${firstName} ${lastName}`;
		const cleanedSlug = EntityService.cleanSlug(slug);
		const existingSlug = await Person.findOne({
			where: { slug: cleanedSlug },
		});
		if (existingSlug) {
			throw new Error(
				"This URL slug has already been taken. Please pick another one."
			);
		}

		const person = Person.create({
			name,
			slug: cleanedSlug,
			aliases,
			description,
			firstName,
			middleName,
			lastName,
			createdByUser: user,
			updatedByUser: user,
		});
		await person.save();
		return person;
	}

	@Mutation(() => Person)
	async updatePerson(
		@Arg("slug") slug: string,
		@Arg("input") input: UpdatePersonInput,
		@Ctx() ctx: CustomContext
	) {
		const { aliases, description, firstName, middleName, lastName } = input;

		if (!firstName || !lastName) {
			throw new Error("A Person must always have a firstName and lastName");
		}
		const user = await User.findOne({ where: { id: ctx.userId } });
		if (!user) {
			throw new Error("You must be logged in to update a Person");
		}

		const person = await Person.findOne({ slug });
		if (!person) {
			throw new Error("Could not find a Person with that slug");
		}

		if (aliases) person.aliases = aliases;
		if (description) person.description = description;
		if (firstName) person.firstName = firstName;
		if (middleName) person.middleName = middleName;
		if (lastName) person.lastName = lastName;

		const name = middleName
			? `${firstName} ${middleName} ${lastName}`
			: `${firstName} ${lastName}`;
		person.name = name;

		person.updatedByUser = user;
		await person.save();
		return person;
	}

	@FieldResolver(() => [Tag])
	tags(@Root() person: Person) {
		return Tag.find({
			where: {
				subjectPersonId: In([person.id]),
				// Don't return AudioItem tags here for efficiency reasons. Instead use
				// audioItemsTaggedWithEntity query.
				objectAudioItemId: null,
			},
		});
	}

	@FieldResolver(() => User, { nullable: true })
	async verifiedUser(@Root() person: Person, @Ctx() ctx: CustomContext) {
		const successfulVerificationRequest = await VerificationRequest.findOne({
			where: {
				personId: person.id,
				status: VerificationRequestStatus.Approved,
			},
		});
		if (successfulVerificationRequest) {
			return successfulVerificationRequest.createdByUser;
		} else {
			return null;
		}
	}
}
