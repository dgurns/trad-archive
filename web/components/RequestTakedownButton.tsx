import { useCallback, useState, useMemo } from "react";
import { useQuery, gql } from "@apollo/client";

import { Entity } from "types";
import useRequireLogin from "hooks/useRequireLogin";
import EntityService from "services/Entity";
import { TakedownRequestFragments } from "fragments";

import Modal from "components/Modal";
import CreateTakedownRequestForm from "components/CreateTakedownRequestForm";
import LoadingBlock from "components/LoadingBlock";

const TAKEDOWN_REQUESTS_FOR_ENTITY = gql`
	query TakedownRequestsForEntity($input: TakedownRequestsForEntityInput!) {
		takedownRequestsForEntity(input: $input) {
			...TakedownRequest
		}
	}
	${TakedownRequestFragments.takedownRequest}
`;

interface Props {
	entity: Entity;
}

const RequestTakedownButton = ({ entity }: Props) => {
	const { currentUser, requireLogin } = useRequireLogin();

	const [modalIsVisible, setModalIsVisible] = useState(false);
	const closeModal = useCallback(() => setModalIsVisible(false), []);

	const { loading, data, error, refetch } = useQuery(
		TAKEDOWN_REQUESTS_FOR_ENTITY,
		{
			variables: {
				input: {
					entityType: entity.entityType,
					entityId: entity.id,
				},
			},
			skip: !modalIsVisible,
		}
	);

	const onButtonClicked = useCallback(async () => {
		if (!currentUser) {
			const redirectTo = EntityService.makeHrefForView(entity);
			await requireLogin({ redirectTo });
		} else {
			setModalIsVisible(true);
		}
	}, [currentUser, entity, requireLogin]);

	const modalContent = useMemo(() => {
		if (loading) {
			return <LoadingBlock />;
		} else if (error) {
			return (
				<div className="text-red-600">Error fetching Takedown Request data</div>
			);
		} else if (data) {
			console.log(data);
			return <div>There is a pending Takedown Request</div>;
		}
		return (
			<>
				<div className="text-gray-500 mb-5">
					We exist as a community resource, and as such we place the foremost
					importance on performers' rights and copyright. You can request a
					takedown using this form. We will be in touch to verify your identity.
				</div>

				<CreateTakedownRequestForm
					entity={entity}
					onSuccess={() => refetch()}
				/>
			</>
		);
	}, [loading, error, data, refetch, entity]);

	return (
		<>
			<span className="flex flex-row items-center" onClick={onButtonClicked}>
				<i className="material-icons-outlined mr-0.5">report_problem</i>
				Request Takedown
			</span>

			<Modal
				title="Request Takedown"
				isVisible={modalIsVisible}
				onClose={closeModal}
			>
				{modalContent}
			</Modal>
		</>
	);
};

export default RequestTakedownButton;
