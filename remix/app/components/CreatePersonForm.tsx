import { useEffect, useState } from "react";
import { useMutation, gql } from "@apollo/client";

import type { Person } from "~/types";
import { EntityFragments } from "~/fragments";
import EntityService from "~/services/Entity";

const CREATE_PERSON_MUTATION = gql`
	mutation CreatePerson($input: CreatePersonInput!) {
		createPerson(input: $input) {
			...Person
		}
	}
	${EntityFragments.person}
`;
interface CreatePersonInput {
	slug: string;
	aliases?: string;
	description?: string;
	firstName: string;
	middleName?: string;
	lastName: string;
}
interface Props {
	onSuccess?: (person: Person) => void;
}
const CreatePersonForm = ({ onSuccess }: Props) => {
	const [createPerson, { loading, error, data }] = useMutation<
		{ createPerson: Person },
		{ input: CreatePersonInput }
	>(CREATE_PERSON_MUTATION, {
		errorPolicy: "all",
	});

	const [firstName, setFirstName] = useState("");
	const [middleName, setMiddleName] = useState("");
	const [lastName, setLastName] = useState("");
	const [slug, setSlug] = useState("");
	const [aliases, setAliases] = useState("");
	const [description, setDescription] = useState("");

	useEffect(() => {
		let proposedSlug = "";
		if (firstName) {
			proposedSlug = firstName;
		}
		if (middleName) {
			proposedSlug = `${proposedSlug}-${middleName}`;
		}
		if (lastName) {
			proposedSlug = `${proposedSlug}-${lastName}`;
		}
		setSlug(EntityService.cleanSlug(proposedSlug));
	}, [firstName, middleName, lastName]);

	const onCreatePerson = (event) => {
		event.preventDefault();
		const input = {
			firstName,
			middleName,
			lastName,
			slug,
			aliases,
			description,
		};
		createPerson({ variables: { input } });
	};

	useEffect(() => {
		if (data?.createPerson) {
			if (onSuccess) {
				return onSuccess(data.createPerson);
			}
			window.alert("Person created successfully!");
			setFirstName("");
			setMiddleName("");
			setLastName("");
			setSlug("");
			setAliases("");
			setDescription("");
		}
	}, [data]);

	return (
		<>
			<div className="flex flex-col align-start">
				<form onSubmit={onCreatePerson}>
					<input
						placeholder="First name"
						autoFocus
						className="mb-2"
						value={firstName}
						onChange={(event) => setFirstName(event.target.value)}
					/>
					<input
						placeholder="Middle name (optional)"
						className="mb-2"
						value={middleName}
						onChange={(event) => setMiddleName(event.target.value)}
					/>
					<input
						placeholder="Last name"
						className="mb-2"
						value={lastName}
						onChange={(event) => setLastName(event.target.value)}
					/>
					<input
						placeholder="URL slug (ie. kitty-hayes)"
						className="mb-2"
						value={slug}
						onChange={(event) => setSlug(event.target.value)}
					/>
					<div className="text-sm text-gray-400 mb-2 ml-2">
						This will be used for the URL of this Person, for example{" "}
						{`https://trad-archive.com/entities/people/${
							slug || "kitty-hayes"
						}`}
					</div>
					<input
						placeholder="Aliases"
						className="mb-2"
						value={aliases}
						onChange={(event) => setAliases(event.target.value)}
					/>
					<div className="text-sm text-gray-400 mb-2 ml-2">
						A list of comma-separated aliases for this Person. For example:{" "}
						<em>Tony D, The Tradfather, Tony from the County Calamari</em>
					</div>
					<textarea
						placeholder="Description"
						className="mb-2"
						value={description}
						rows={5}
						onChange={(event) => setDescription(event.target.value)}
					/>
					<input
						type="submit"
						className="btn mb-4 w-auto"
						disabled={loading}
						value="Create"
					/>
				</form>
			</div>

			{error && <div className="text-red-600">{error.message}</div>}
		</>
	);
};

export default CreatePersonForm;
