import { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

import {
	EntityType,
	Entity,
	Person,
	isPerson,
	UserVerificationRequest,
	CopyrightPermissionStatus,
} from "types";
import { UserVerificationRequestFragments } from "fragments";
import useUserVerificationRequestsForUser from "hooks/useUserVerificationRequestsForUser";

import Layout from "components/Layout";
import RequireUser from "components/RequireUser";
import SearchEntities from "components/SearchEntities";
import LoadingCircle from "components/LoadingCircle";

const CREATE_USER_VERIFICATION_REQUEST_MUTATION = gql`
	mutation CreateUserVerificationRequest(
		$input: CreateUserVerificationRequestInput!
	) {
		createUserVerificationRequest(input: $input) {
			...UserVerificationRequest
		}
	}
	${UserVerificationRequestFragments.userVerificationRequest}
`;

interface MutationData {
	createUserVerificationRequest: UserVerificationRequest;
}
interface MutationVars {
	input: {
		personId: string;
		imageS3Key: string;
		copyrightPermissionStatus: CopyrightPermissionStatus;
	};
}

const AccountVerify = () => {
	const router = useRouter();
	const [
		,
		{
			refetch: refetchVerificationRequestsForUser,
			loading: refetchVerificationRequestsIsLoading,
		},
	] = useUserVerificationRequestsForUser();

	const [personEntity, setPersonEntity] = useState<Person | undefined>();
	const [imageFileObjectUrl, setImageFileObjectUrl] = useState<
		string | undefined
	>();
	const [copyrightPermissionIsGranted, setCopyrightPermissionIsGranted] =
		useState(false);

	const [createUserVerificationRequest, { loading, data, error }] = useMutation<
		MutationData,
		MutationVars
	>(CREATE_USER_VERIFICATION_REQUEST_MUTATION, { errorPolicy: "all" });

	const onSelectEntity = (entity: Entity) => {
		if (isPerson(entity)) {
			setPersonEntity(entity);
		}
	};

	const onImageFileChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files?.length) {
			return;
		}
		const selectedFile = event.target.files[0];
		const objectUrl = URL.createObjectURL(selectedFile);
		setImageFileObjectUrl(objectUrl);
	};
	// Clear the existing object URL whenever it changes
	useEffect(() => {
		return () => {
			if (imageFileObjectUrl) {
				URL.revokeObjectURL(imageFileObjectUrl);
			}
		};
	}, [imageFileObjectUrl]);

	const requiredFieldsAreSet =
		personEntity && imageFileObjectUrl && copyrightPermissionIsGranted;

	const onSubmitClicked = () => {
		if (!requiredFieldsAreSet) {
			return window.alert("Please fill out all the fields");
		}
		createUserVerificationRequest({
			variables: {
				input: {
					personId: personEntity.id,
					imageS3Key: "test-s3-key",
					copyrightPermissionStatus:
						CopyrightPermissionStatus.FullNonCommercialGranted,
				},
			},
		});
	};

	useEffect(() => {
		const refetchAndRedirect = async () => {
			await refetchVerificationRequestsForUser();
			router.push("/account");
		};
		if (data?.createUserVerificationRequest?.id) {
			refetchAndRedirect();
		}
	}, [data, router, refetchVerificationRequestsForUser]);

	return (
		<Layout>
			<RequireUser>
				<h1 className="mb-4">Verify Yourself and Link Person Tag</h1>
				<div className="mb-8 text-gray-500">
					By verifying yourself, you can link your account to a Person tag. For
					example, if you are Michael Coleman (bear with us) you can link
					yourself to the "Michael Coleman" tag on the site. You'll get a
					verified badge next to your username, and you'll be able to
					immediately take down any content that you're tagged in, if you so
					choose. Verification is completely free and will be done by ITMA
					staff.
				</div>

				{!personEntity ? (
					<>
						<div className="mb-2">
							Search for your name and click the Person if found. If it doesn't
							exist yet, go ahead and create a new one.
						</div>
						<div className="flex flex-col max-w-xs">
							<SearchEntities
								className="mb-8"
								entityTypes={[EntityType.Person]}
								take={15}
								onSelect={onSelectEntity}
								onNewEntityCreated={onSelectEntity}
							/>
						</div>
					</>
				) : (
					<div className="mb-8">
						<div className="mb-2 font-bold">You have selected:</div>
						{personEntity.firstName} {personEntity.lastName}
						<button
							className="btn-text ml-2"
							onClick={() => setPersonEntity(undefined)}
						>
							Clear
						</button>
					</div>
				)}

				<div className="mb-8">
					<div className="mb-2">
						Please attach a photo proving your identity (utility bill, ID, etc):
					</div>
					<input
						type="file"
						accept=".png,.jpeg,.jpg"
						onChange={onImageFileChanged}
						className="block"
					/>
					{imageFileObjectUrl && (
						<img src={imageFileObjectUrl} className="h-48 mt-4" />
					)}
				</div>

				<div className="mb-2">
					Do you give the Irish Traditional Music Archive (ITMA) permission to
					make recordings of you publicly available for non-commercial use, as
					long as you can take them down at any time?
				</div>
				<div className="mb-8 flex flex-row items-center justify-start">
					<input
						type="checkbox"
						id="copyright-permission"
						checked={copyrightPermissionIsGranted}
						onChange={(event) =>
							setCopyrightPermissionIsGranted(event.target.checked)
						}
					/>
					<label htmlFor="copyright-permission" className="ml-2">
						Yes, I give permission
					</label>
				</div>

				{loading || refetchVerificationRequestsIsLoading ? (
					<LoadingCircle />
				) : (
					<button
						className="btn"
						onClick={onSubmitClicked}
						disabled={!requiredFieldsAreSet}
					>
						Submit
					</button>
				)}

				{error && (
					<div className="mt-4 text-red-600">
						Error submitting user verification request. Please reload the page
						and try again.
					</div>
				)}
			</RequireUser>
		</Layout>
	);
};

export default AccountVerify;
