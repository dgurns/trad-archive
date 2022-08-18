import { useState } from "react";

import { type Entity } from "~/types";
import Modal from "~/components/Modal";
import CreateTagForm from "~/components/CreateTagForm";

interface Props {
	entity: Entity;
	className?: string;
	children?: React.ReactChild | React.ReactChild[];
}
const AddTagButton = ({ entity, className, children }: Props) => {
	const [modalIsVisible, setModalIsVisible] = useState(false);

	return (
		<>
			<button
				className={`btn-text whitespace-pre ${className ?? ""}`}
				onClick={() => setModalIsVisible(true)}
			>
				{children ?? "+ Add Tag"}
			</button>

			<Modal
				title="Add Tag"
				isVisible={modalIsVisible}
				onClose={() => setModalIsVisible(false)}
			>
				<CreateTagForm
					entity={entity}
					onSuccess={() => setModalIsVisible(false)}
				/>
			</Modal>
		</>
	);
};

export default AddTagButton;
