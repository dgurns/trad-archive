import { useState, useCallback, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";

import { Submission, SubmissionMaterialType } from "types";
import { SubmissionFragments } from "fragments";
import useCurrentUser from "hooks/useCurrentUser";

import Checkbox from "components/Checkbox";

const CREATE_SUBMISSION = gql`
	mutation CreateSubmission($input: CreateSubmissionInput!) {
		createSubmission(input: $input) {
			...Submission
		}
	}
	${SubmissionFragments.submission}
`;

interface MutationData {
	createSubmission: Submission;
}
interface MutationVariables {
	input: {
		materialTypes: SubmissionMaterialType[];
		userControlsCopyright: boolean;
		copyrightDetails?: string;
		description?: string;
	};
}
interface Props {
	onSuccess?: (submission: Submission) => void;
}

const CreateSubmissionForm = ({ onSuccess }: Props) => {
	const [currentUser] = useCurrentUser();

	const [materialTypes, setMaterialTypes] = useState([]);
	const [userControlsCopyright, setUserControlsCopyright] = useState(true);
	const [copyrightDetails, setCopyrightDetails] = useState("");
	const [description, setDescription] = useState("");
	const [userGrantsPermissionToITMA, setUserGrantsPermissionToITMA] =
		useState(false);
	const [validationError, setValidationError] = useState("");

	const [createSubmission, { loading, data, error }] = useMutation<
		MutationData,
		MutationVariables
	>(CREATE_SUBMISSION, { errorPolicy: "all" });

	const onMaterialTypeChecked = (
		materialType: SubmissionMaterialType,
		isChecked: boolean
	) => {
		if (isChecked) {
			setMaterialTypes(materialTypes.concat(materialType));
		} else {
			setMaterialTypes(materialTypes.filter((mt) => mt !== materialType));
		}
	};

	const materialTypeIsChecked = (materialType: SubmissionMaterialType) => {
		return materialTypes.includes(materialType);
	};

	const onSubmitForm = useCallback(
		(event) => {
			event.preventDefault();
			setValidationError("");
			// TODO: VALIDATE
			const input = {};
			try {
				// createSubmission({
				// 	variables: {
				// 		input,
				// 	},
				// });
			} catch {
				//
			}
		},
		[createSubmission]
	);

	useEffect(() => {
		if (data?.createSubmission?.id && onSuccess) {
			onSuccess(data.createSubmission);
		}
	}, [data, onSuccess]);

	return (
		<form className="flex flex-col items-start" onSubmit={onSubmitForm}>
			<div className="flex flex-col mb-5">
				<div className="mb-2">
					What types of material would you like to upload?
				</div>
				<Checkbox
					id="audio"
					label="Audio"
					checked={materialTypeIsChecked(SubmissionMaterialType.Audio)}
					onChange={(e) =>
						onMaterialTypeChecked(
							SubmissionMaterialType.Audio,
							e.target.checked
						)
					}
					className="mb-1"
				/>
				<Checkbox
					id="video"
					label="Video"
					checked={materialTypeIsChecked(SubmissionMaterialType.Video)}
					onChange={(e) =>
						onMaterialTypeChecked(
							SubmissionMaterialType.Video,
							e.target.checked
						)
					}
					className="mb-1"
				/>
				<Checkbox
					id="image"
					label="Image"
					checked={materialTypeIsChecked(SubmissionMaterialType.Image)}
					onChange={(e) =>
						onMaterialTypeChecked(
							SubmissionMaterialType.Image,
							e.target.checked
						)
					}
					className="mb-1"
				/>
				<Checkbox
					id="document"
					label="Document"
					checked={materialTypeIsChecked(SubmissionMaterialType.Document)}
					onChange={(e) =>
						onMaterialTypeChecked(
							SubmissionMaterialType.Document,
							e.target.checked
						)
					}
					className="mb-1"
				/>
			</div>
			<div className="mb-2">Do you control the copyright for these items?</div>
			<select
				className="mb-6"
				value={userControlsCopyright ? "Yes" : "No"}
				onChange={(event) =>
					setUserControlsCopyright(event.target.value === "Yes" ? true : false)
				}
			>
				<option value={"Yes"}>Yes</option>
				<option value={"No"}>No</option>
			</select>
			{!userControlsCopyright && (
				<div className="mb-6">
					<div className="mb-2">
						Who controls the copyright? Are you donating on someone's behalf?
					</div>
					<textarea
						rows={3}
						value={copyrightDetails}
						onChange={(e) => setCopyrightDetails(e.target.value)}
					/>
				</div>
			)}
			<div className="mb-2">
				Please describe this material:
				<br />
				- Who collected it?
				<br />- Who originally recorded it?
				<br />- Who is featured in these items?
				<br />- What are the recording dates?
				<br />- What are the recording locations?
				<br />- Any other comments you'd like to add?
			</div>
			<textarea
				className="mb-6"
				rows={12}
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>

			<Checkbox
				className="mb-6"
				checked={userGrantsPermissionToITMA}
				label="By clicking this box, I consent to upload and give the digitised
			material to the Irish Traditional Music Archive (Dublin, Ireland). ITMA
			reserves the right to retain or delete at any time this material based on
			its collection policy."
				onChange={(e) => setUserGrantsPermissionToITMA(e.target.checked)}
			/>

			<input
				type="submit"
				value="Save and Continue to Upload"
				disabled={loading || !userGrantsPermissionToITMA}
			/>

			{validationError && (
				<div className="mt-4 text-red-600">{validationError}</div>
			)}
			{error && (
				<div className="mt-4 text-red-600">
					Error saving Submission. Please reload the page and try again.
				</div>
			)}

			<div className="text-gray-500 italic mt-6">
				As per ITMA's Data Protection policy the information provided on this
				form will not be used for any other purpose; it will be stored securely
				and will not be shared with any third parties.
			</div>
		</form>
	);
};

export default CreateSubmissionForm;
