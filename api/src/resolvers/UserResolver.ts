import { Resolver, Arg, Root, Ctx, Query, FieldResolver } from "type-graphql";
import { CustomContext } from "middleware/context";
import { User } from "models/User";
import {
	VerificationRequest,
	VerificationRequestStatus,
} from "models/VerificationRequest";
import { Person } from "models/entities/Person";

@Resolver(() => User)
export class UserResolver {
	@Query(() => User)
	user(@Arg("id") id: string) {
		return User.findOne({ where: { id } });
	}

	@FieldResolver(() => Person, { nullable: true })
	async verifiedPerson(@Root() user: User, @Ctx() ctx: CustomContext) {
		const successfulVerificationRequest = await VerificationRequest.findOne({
			where: {
				createdByUserId: user.id,
				status: VerificationRequestStatus.Approved,
			},
		});
		if (successfulVerificationRequest) {
			return successfulVerificationRequest.person;
		} else {
			return null;
		}
	}
}
