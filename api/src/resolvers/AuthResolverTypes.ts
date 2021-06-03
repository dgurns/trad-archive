import { InputType, Field } from "type-graphql";

@InputType()
export class SignUpInput {
	@Field(() => String)
	email!: string;

	@Field(() => String, { nullable: true })
	username?: string;

	@Field(() => String, { nullable: true })
	redirectTo?: string;
}

@InputType()
export class LogInInput {
	@Field(() => String)
	email!: string;

	@Field(() => String, { nullable: true })
	redirectTo?: string;
}

@InputType()
export class AuthenticateWithAutoLoginTokenInput {
	@Field(() => String)
	userEmail!: string;

	@Field(() => String)
	tokenUnhashed!: string;
}
