import { useEffect, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { Person } from "types";
import { EntityFragments } from "fragments";

const UPDATE_PERSON_MUTATION = gql`
	mutation UpdatePerson($slug: String!, $input: UpdatePersonInput!) {
		updatePerson(slug: $slug, input: $input) {
			...Person
		}
	}
	${EntityFragments.person}
`;
interface UpdatePersonVariables {
	slug: string;
	input: {
		aliases?: string;
		description?: string;
		firstName: string;
		middleName?: string;
		lastName: string;
	};
}
interface Props {
	person: Person;
	onSuccess?: (person: Person) => void;
}
const EditPersonForm = ({ person, onSuccess }: Props) => {
	const router = useRouter();

	const [updatePerson, { loading, error, data }] = useMutation<
		{ updatePerson: Person },
		UpdatePersonVariables
	>(UPDATE_PERSON_MUTATION, {
		errorPolicy: "all",
	});

	const [firstName, setFirstName] = useState(person.firstName);
	const [middleName, setMiddleName] = useState(person.middleName);
	const [lastName, setLastName] = useState(person.lastName);
	const [aliases, setAliases] = useState(person.aliases);
	const [description, setDescription] = useState(person.description);

	const onUpdatePerson = (event) => {
		event.preventDefault();
		const input = {
			firstName,
			middleName,
			lastName,
			aliases,
			description,
		};
		updatePerson({ variables: { slug: person.slug, input } });
	};

	useEffect(() => {
		if (data?.updatePerson) {
			if (onSuccess) {
				return onSuccess(data.updatePerson);
			}
			window.alert("Person updated successfully!");
		}
	}, [data, router]);

	return (
		<>
			<div className="flex flex-col align-start">
				<form onSubmit={onUpdatePerson}>
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
						rows={10}
						onChange={(event) => setDescription(event.target.value)}
					/>
					<input
						type="submit"
						className="btn mb-4 w-auto"
						disabled={loading}
						value="Save"
					/>
				</form>
			</div>

			{error && <div className="text-red-600">{error.message}</div>}
		</>
	);
};

export default EditPersonForm;
