import { useEffect, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { Instrument } from "types";
import { EntityFragments } from "fragments";

const UPDATE_INSTRUMENT_MUTATION = gql`
	mutation UpdateInstrument($slug: String!, $input: UpdateInstrumentInput!) {
		updateInstrument(slug: $slug, input: $input) {
			...Instrument
		}
	}
	${EntityFragments.instrument}
`;
interface UpdateInstrumentVariables {
	slug: string;
	input: {
		name?: string;
		aliases?: string;
		description?: string;
	};
}
interface Props {
	instrument: Instrument;
	onSuccess?: (instrument: Instrument) => void;
}
const EditInstrumentForm = ({ instrument, onSuccess }: Props) => {
	const router = useRouter();

	const [updateInstrument, { loading, error, data }] = useMutation<
		{ updateInstrument: Instrument },
		UpdateInstrumentVariables
	>(UPDATE_INSTRUMENT_MUTATION, {
		errorPolicy: "all",
	});

	const [name, setName] = useState(instrument.name);
	const [aliases, setAliases] = useState(instrument.aliases);
	const [description, setDescription] = useState(instrument.description);

	const onUpdateInstrument = (event) => {
		event.preventDefault();
		const input = {
			name,
			aliases,
			description,
		};
		updateInstrument({ variables: { slug: instrument.slug, input } });
	};

	useEffect(() => {
		if (data?.updateInstrument) {
			if (onSuccess) {
				return onSuccess(data.updateInstrument);
			}
			window.alert("Instrument updated successfully!");
		}
	}, [data, router]);

	return (
		<>
			<div className="flex flex-col align-start">
				<form onSubmit={onUpdateInstrument}>
					<input
						placeholder="Name"
						autoFocus
						className="mb-2"
						value={name}
						onChange={(event) => setName(event.target.value)}
					/>
					<input
						placeholder="Aliases"
						className="mb-2"
						value={aliases}
						onChange={(event) => setAliases(event.target.value)}
					/>
					<div className="text-sm text-gray-400 mb-2 ml-2">
						A list of comma-separated aliases for this Instrument. For example:{" "}
						<em>Stomach Steinway, Squeezebox, Belly Organ</em>
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

export default EditInstrumentForm;
