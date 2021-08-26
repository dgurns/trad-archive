import { Resolver, Arg, Root, Ctx, Query, FieldResolver } from "type-graphql";
import { CustomContext } from "middleware/context";
import { User } from "models/User";
import {
	UserVerificationRequest,
	UserVerificationRequestStatus,
} from "models/UserVerificationRequest";
import { Person } from "models/entities/Person";

@Resolver(() => User)
export class UserResolver {
	@Query(() => User)
	user(@Arg("id") id: string) {
		return User.findOne({ where: { id } });
	}

	@FieldResolver(() => Person, { nullable: true })
	async verifiedPerson(@Root() user: User, @Ctx() ctx: CustomContext) {
		const successfulVerificationRequest = await UserVerificationRequest.findOne(
			{
				where: {
					createdByUserId: user.id,
					status: UserVerificationRequestStatus.Approved,
				},
			}
		);
		if (successfulVerificationRequest) {
			return successfulVerificationRequest.person;
		} else {
			return null;
		}
	}
}
