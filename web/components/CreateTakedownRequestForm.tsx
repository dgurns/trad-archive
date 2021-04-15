import { useState, useCallback, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";

import {
	Entity,
	EntityType,
	TakedownRequest,
	TakedownRequestType,
} from "types";
import { TakedownRequestFragments } from "fragments";

const CREATE_TAKEDOWN_REQUEST = gql`
	mutation CreateTakedownRequest($input: CreateTakedownRequestInput!) {
		createTakedownRequest(input: $input) {
			...TakedownRequest
		}
	}
	${TakedownRequestFragments.takedownRequest}
`;

interface MutationData {
	createTakedownRequest: TakedownRequest;
}
interface MutationVariables {
	input: {
		entityType: EntityType;
		entityId: string;
		type: TakedownRequestType;
		message: string;
	};
}
interface Props {
	entity: Entity;
	onSuccess?: (takedownRequest: TakedownRequest) => void;
}

const CreateTakedownRequestForm = ({ entity, onSuccess }: Props) => {
	const defaultType = Object.keys(TakedownRequestType)[0];
	const [type, setType] = useState(defaultType);
	const [message, setMessage] = useState("");
	const [validationError, setValidationError] = useState("");

	const [createTakedownRequest, { loading, data, error }] = useMutation<
		MutationData,
		MutationVariables
	>(CREATE_TAKEDOWN_REQUEST, { errorPolicy: "all" });

	const getLabelForType = (type: TakedownRequestType) => {
		switch (TakedownRequestType[type]) {
			case TakedownRequestType.Performer:
				return "I'm a performer in it";
			case TakedownRequestType.Copyright:
				return "I own the copyright";
			default:
				return type;
		}
	};

	const onSubmitForm = useCallback(
		(event) => {
			event.preventDefault();
			setValidationError("");
			if (!message) {
				return setValidationError("Please include details about your request");
			}
			const input = {
				entityType: entity.entityType,
				entityId: entity.id,
				type: type as TakedownRequestType,
				message,
			};
			try {
				createTakedownRequest({
					variables: {
						input,
					},
				});
			} catch {
				//
			}
		},
		[message, entity, type, createTakedownRequest]
	);

	useEffect(() => {
		if (data?.createTakedownRequest?.id && onSuccess) {
			onSuccess(data.createTakedownRequest);
		}
	}, [data, onSuccess]);

	return (
		<form className="flex flex-col items-start" onSubmit={onSubmitForm}>
			<label htmlFor="select-type" className="mb-2">
				Why are you requesting a takedown for this {entity.entityType}?
			</label>
			<select
				id="select-type"
				className="mb-6"
				value={type}
				onChange={(event) => setType(event.target.value as TakedownRequestType)}
			>
				{Object.keys(TakedownRequestType).map((type, index) => (
					<option value={type} key={index}>
						{getLabelForType(type as TakedownRequestType)}
					</option>
				))}
			</select>

			<textarea
				className="mb-6"
				placeholder="Please include as many details as you can..."
				value={message}
				onChange={(event) => setMessage(event.target.value)}
				rows={4}
			/>

			<input type="submit" value="Submit" disabled={loading} />

			{validationError && (
				<div className="mt-6 text-red-600">{validationError}</div>
			)}
			{error && (
				<div className="mt-6 text-red-600">
					{error.graphQLErrors.join(", ")}
				</div>
			)}
		</form>
	);
};

export default CreateTakedownRequestForm;
