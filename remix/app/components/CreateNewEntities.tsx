import { useState, useCallback } from "react";

import type { Entity, Person, Instrument, Place, Collection } from "~/types";
import { EntityType } from "~/types";
import useRequireLogin from "~/hooks/useRequireLogin";

import Modal from "~/components/Modal";
import CreatePersonForm from "~/components/CreatePersonForm";
import CreateInstrumentForm from "~/components/CreateInstrumentForm";
import CreatePlaceForm from "~/components/CreatePlaceForm";
import CreateCollectionForm from "~/components/CreateCollectionForm";

interface Props {
	entityTypes?: EntityType[];
	onNewEntityCreated: (entity: Entity) => void;
}
const CreateNewEntities = ({ entityTypes, onNewEntityCreated }: Props) => {
	const { currentUser, requireLogin } = useRequireLogin();

	const [createPersonModalIsVisible, setCreatePersonModalIsVisible] =
		useState(false);
	const [createInstrumentModalIsVisible, setCreateInstrumentModalIsVisible] =
		useState(false);
	const [createPlaceModalIsVisible, setCreatePlaceModalIsVisible] =
		useState(false);
	const [createCollectionModalIsVisible, setCreateCollectionModalIsVisible] =
		useState(false);

	const onCreateNewPersonClicked = useCallback(async () => {
		if (!currentUser) {
			return await requireLogin();
		}
		setCreatePersonModalIsVisible(true);
	}, [requireLogin, currentUser]);

	const onCreateNewInstrumentClicked = useCallback(async () => {
		if (!currentUser) {
			return await requireLogin();
		}
		setCreateInstrumentModalIsVisible(true);
	}, [requireLogin, currentUser]);

	const onCreateNewPlaceClicked = useCallback(async () => {
		if (!currentUser) {
			return await requireLogin();
		}
		setCreatePlaceModalIsVisible(true);
	}, [requireLogin, currentUser]);

	const onCreateNewCollectionClicked = useCallback(async () => {
		if (!currentUser) {
			return await requireLogin();
		}
		setCreateCollectionModalIsVisible(true);
	}, [requireLogin, currentUser]);

	const onNewPersonCreated = useCallback(
		(person: Person) => {
			setCreatePersonModalIsVisible(false);
			onNewEntityCreated(person);
		},
		[onNewEntityCreated]
	);

	const onNewInstrumentCreated = useCallback((instrument: Instrument) => {
		setCreateInstrumentModalIsVisible(false);
		onNewEntityCreated(instrument);
	}, []);

	const onNewPlaceCreated = useCallback((place: Place) => {
		setCreatePlaceModalIsVisible(false);
		onNewEntityCreated(place);
	}, []);

	const onNewCollectionCreated = useCallback((collection: Collection) => {
		setCreateCollectionModalIsVisible(false);
		onNewEntityCreated(collection);
	}, []);

	const shouldShowCreatePerson =
		typeof entityTypes === "undefined" ||
		entityTypes.includes(EntityType.Person);
	const shouldShowCreateInstrument =
		typeof entityTypes === "undefined" ||
		entityTypes.includes(EntityType.Instrument);
	const shouldShowCreatePlace =
		typeof entityTypes === "undefined" ||
		entityTypes.includes(EntityType.Place);
	const shouldShowCreateCollection =
		typeof entityTypes === "undefined" ||
		entityTypes.includes(EntityType.Collection);

	const shouldShowCommaAfterCreatePerson =
		!entityTypes ||
		shouldShowCreateInstrument ||
		shouldShowCreatePlace ||
		shouldShowCreateCollection;
	const shouldShowCommaAfterCreateInstrument =
		!entityTypes || shouldShowCreatePlace || shouldShowCreateCollection;
	const shouldShowCommaAfterCreatePlace =
		!entityTypes || shouldShowCreateCollection;

	return (
		<>
			<div className="text-gray-500">
				Can't find it? Create new:{" "}
				{shouldShowCreatePerson && (
					<>
						<button className="btn-text" onClick={onCreateNewPersonClicked}>
							Person
						</button>
						{shouldShowCommaAfterCreatePerson && ", "}
					</>
				)}
				{shouldShowCreateInstrument && (
					<>
						<button className="btn-text" onClick={onCreateNewInstrumentClicked}>
							Instrument
						</button>
						{shouldShowCommaAfterCreateInstrument && ", "}
					</>
				)}
				{shouldShowCreatePlace && (
					<>
						<button className="btn-text" onClick={onCreateNewPlaceClicked}>
							Place
						</button>
						{shouldShowCommaAfterCreatePlace && ", "}
					</>
				)}
				{shouldShowCreateCollection && (
					<button className="btn-text" onClick={onCreateNewCollectionClicked}>
						Collection
					</button>
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

			<Modal
				title="Create New Place"
				isVisible={createPlaceModalIsVisible}
				onClose={() => setCreatePlaceModalIsVisible(false)}
			>
				<CreatePlaceForm onSuccess={onNewPlaceCreated} />
			</Modal>

			<Modal
				title="Create New Collection"
				isVisible={createCollectionModalIsVisible}
				onClose={() => setCreateCollectionModalIsVisible(false)}
			>
				<CreateCollectionForm onSuccess={onNewCollectionCreated} />
			</Modal>
		</>
	);
};

export default CreateNewEntities;
