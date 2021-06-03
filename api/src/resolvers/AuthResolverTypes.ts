import { InputType, Field } from "type-graphql";

@InputType()
export class SignUpInput {
	@Field(() => String)
	email!: string;

	@Field(() => String, { nullable: true })
	username?: string;
}

@InputType()
export class LogInInput {
	@Field(() => String)
	email!: string;
}