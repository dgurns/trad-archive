import { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "@remix-run/react";

import type { Entity, Person, VerificationRequest } from "~/types";
import { EntityType, isPerson, CopyrightPermissionStatus } from "~/types";
import { VerificationRequestFragments } from "~/fragments";
import useVerificationRequestsForCurrentUser from "~/hooks/useVerificationRequestsForCurrentUser";

import Layout from "~/components/Layout";
import RequireUser from "~/components/RequireUser";
import SearchEntities from "~/components/SearchEntities";
import LoadingCircle from "~/components/LoadingCircle";
import Breadcrumb from "~/components/Breadcrumb";

const CREATE_PRESIGNED_UPLOAD_URL_MUTATION = gql`
	mutation CreatePresignedUploadUrl($filename: String!) {
		createPresignedUploadUrlForVerificationImage(filename: $filename) {
			imageS3Key
			presignedUploadUrl
		}
	}
`;
const CREATE_VERIFICATION_REQUEST_MUTATION = gql`
	mutation CreateVerificationRequest($input: CreateVerificationRequestInput!) {
		createVerificationRequest(input: $input) {
			...VerificationRequest
		}
	}
	${VerificationRequestFragments.verificationRequest}
`;

interface CreatePresignedUploadUrlMutationData {
	createPresignedUploadUrlForVerificationImage: {
		imageS3Key: string;
		presignedUploadUrl: string;
	};
}
interface CreatePresignedUploadUrlMutationVars {
	filename: string;
}
interface CreateVerificationRequestMutationData {
	createVerificationRequest: VerificationRequest;
}
interface CreateVerificationRequestMutationVars {
	input: {
		personId: string;
		imageS3Key: string;
		copyrightPermissionStatus: CopyrightPermissionStatus;
	};
}

const AccountVerify = () => {
	const navigate = useNavigate();
	const [
		_,
		{
			refetch: refetchVerificationRequestsForCurrentUser,
			loading: refetchVerificationRequestsIsLoading,
		},
	] = useVerificationRequestsForCurrentUser();

	const [personEntity, setPersonEntity] = useState<Person | undefined>();
	const [imageFile, setImageFile] = useState<File>();
	const [imageFileObjectUrl, setImageFileObjectUrl] = useState<
		string | undefined
	>();
	const [copyrightPermissionIsGranted, setCopyrightPermissionIsGranted] =
		useState(false);
	const [formIsSubmitting, setFormIsSubmitting] = useState(false);

	const [createPresignedUploadUrl] = useMutation<
		CreatePresignedUploadUrlMutationData,
		CreatePresignedUploadUrlMutationVars
	>(CREATE_PRESIGNED_UPLOAD_URL_MUTATION, { errorPolicy: "all" });

	const [createVerificationRequest] = useMutation<
		CreateVerificationRequestMutationData,
		CreateVerificationRequestMutationVars
	>(CREATE_VERIFICATION_REQUEST_MUTATION, { errorPolicy: "all" });

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
		setImageFile(selectedFile);
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
		personEntity && imageFile && copyrightPermissionIsGranted;

	const onSubmitClicked = async () => {
		if (!requiredFieldsAreSet) {
			return window.alert("Please fill out all the fields");
		}
		setFormIsSubmitting(true);
		try {
			// Create a presigned upload URL for the image
			const response = await createPresignedUploadUrl({
				variables: { filename: imageFile.name },
			});
			const { imageS3Key, presignedUploadUrl } =
				response.data.createPresignedUploadUrlForVerificationImage;
			// Upload the image
			await fetch(presignedUploadUrl, { method: "PUT", body: imageFile });
			// Then create the VerificationRequest
			const { data } = await createVerificationRequest({
				variables: {
					input: {
						personId: personEntity.id,
						imageS3Key,
						copyrightPermissionStatus:
							CopyrightPermissionStatus.FullNonCommercialGranted,
					},
				},
			});
			if (!data.createVerificationRequest) {
				throw new Error();
			}
			// Refetch the Verification Requests for current user and navigate to
			// their Account page
			await refetchVerificationRequestsForCurrentUser();
			setFormIsSubmitting(false);
			navigate("/account");
		} catch {
			setFormIsSubmitting(false);
			window.alert(
				"Error submitting verification request. Please reload and try again."
			);
		}
	};

	const shouldPromptToChoosePerson =
		!personEntity && imageFile && copyrightPermissionIsGranted;

	return (
		<Layout>
			<RequireUser>
				<Breadcrumb
					items={[
						{
							label: "Account",
							href: "/account",
						},
						{ label: "Verify Your Account" },
					]}
					className="mb-4"
				/>
				<div className="mb-8 text-gray-500">
					This enables you to link your user account with a Person tag. For
					example, let's say you are Michael Coleman; you can link your user
					account to the "Michael Coleman" tag on the site. You'll get a
					verified badge next to your username, and you'll be able to
					immediately take down any content that you're tagged in, if you want
					to. Verification is free and will be done by ITMA staff.
				</div>

				{!personEntity ? (
					<>
						<div className="mb-2">
							Search for your name and click on the Person if found. If it
							doesn't exist yet, go ahead and create a new one.
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
						Please attach a photo proving your identity (utility bill, ID, etc;
						will be deleted after verification):
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
					make recordings of you publicly available for non-commercial use,
					given that you can take them down at any time?
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

				{refetchVerificationRequestsIsLoading || formIsSubmitting ? (
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

				{shouldPromptToChoosePerson && (
					<div className="text-red-600 mt-6">Please select a Person above</div>
				)}
			</RequireUser>
		</Layout>
	);
};

export default AccountVerify;