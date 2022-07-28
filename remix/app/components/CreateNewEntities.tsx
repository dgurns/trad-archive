import { useState, useCallback } from "react";
import { type Person, type Instrument, EntityType } from "@prisma/client";

import type { Entity } from "~/types";

import Modal from "~/components/Modal";
import CreatePersonForm from "~/components/CreatePersonForm";
import CreateInstrumentForm from "~/components/CreateInstrumentForm";

interface Props {
	entityTypes?: EntityType[];
	onNewEntityCreated?: (entity: Entity) => void;
}
const CreateNewEntities = ({ entityTypes, onNewEntityCreated }: Props) => {
	const [createPersonModalIsVisible, setCreatePersonModalIsVisible] =
		useState(false);
	const [createInstrumentModalIsVisible, setCreateInstrumentModalIsVisible] =
		useState(false);

	const onNewPersonCreated = useCallback(
		(person: Person) => {
			setCreatePersonModalIsVisible(false);
			if (onNewEntityCreated) {
				onNewEntityCreated(person);
			}
		},
		[onNewEntityCreated]
	);

	const onNewInstrumentCreated = useCallback(
		(instrument: Instrument) => {
			setCreateInstrumentModalIsVisible(false);
			if (onNewEntityCreated) {
				onNewEntityCreated(instrument);
			}
		},
		[onNewEntityCreated]
	);

	const shouldShowCreatePerson =
		typeof entityTypes === "undefined" ||
		entityTypes.includes(EntityType.Person);
	const shouldShowCreateInstrument =
		typeof entityTypes === "undefined" ||
		entityTypes.includes(EntityType.Instrument);

	const shouldShowCommaAfterCreatePerson =
		!entityTypes || shouldShowCreateInstrument;

	return (
		<>
			<div className="text-gray-500">
				Can't find it? Create new:{" "}
				{shouldShowCreatePerson && (
					<>
						<button
							className="btn-text"
							onClick={() => setCreatePersonModalIsVisible(true)}
						>
							Person
						</button>
						{shouldShowCommaAfterCreatePerson && ", "}
					</>
				)}
				{shouldShowCreateInstrument && (
					<>
						<button
							className="btn-text"
							onClick={() => setCreateInstrumentModalIsVisible(true)}
						>
							Instrument
						</button>
					</>
				)}
			</div>

			<Modal
				title="Create New Person"
				isVisible={createPersonModalIsVisible}
				onClose={() => setCreatePersonModalIsVisible(false)}
			>
				<CreatePersonForm onSuccess={onNewPersonCreated} />
			</Modal>

			<Modal
				title="Create New Instrument"
				isVisible={createInstrumentModalIsVisible}
				onClose={() => setCreateInstrumentModalIsVisible(false)}
			>
				<CreateInstrumentForm onSuccess={onNewInstrumentCreated} />
			</Modal>
		</>
	);
};

export default CreateNewEntities;
