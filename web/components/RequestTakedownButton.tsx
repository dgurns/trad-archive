import { useCallback, useState } from "react";
import { Entity } from "types";

import Modal from "components/Modal";
import CreateTakedownRequestForm from "components/CreateTakedownRequestForm";

interface Props {
	entity: Entity;
}

const RequestTakedownButton = ({ entity }: Props) => {
	const [modalIsVisible, setModalIsVisible] = useState(false);

	const onOpenModal = useCallback((event) => setModalIsVisible(true), []);
	const onCloseModal = useCallback(() => setModalIsVisible(false), []);

	return (
		<>
			<span className="flex flex-row items-center" onClick={onOpenModal}>
				<i className="material-icons-outlined mr-0.5">report_problem</i>
				Request Takedown
			</span>

			<Modal
				title="Request Takedown"
				isVisible={modalIsVisible}
				onClose={onCloseModal}
			>
				<CreateTakedownRequestForm entity={entity} />
			</Modal>
		</>
	);
};

export default RequestTakedownButton;
