import { useCallback, useState, useMemo } from "react";
import { useQuery, gql } from "@apollo/client";

import {
	Entity,
	EntityType,
	TakedownRequest,
	isPendingTakedownRequest,
	isApprovedTakedownRequest,
} from "types";
import useRequireLogin from "hooks/useRequireLogin";
import EntityService from "services/Entity";
import { TakedownRequestFragments } from "fragments";

import Modal from "components/Modal";
import CreateTakedownRequestForm from "components/CreateTakedownRequestForm";
import LoadingBlock from "components/LoadingBlock";
import DateTimeService from "services/DateTime";

const TAKEDOWN_REQUESTS_FOR_ENTITY = gql`
	query TakedownRequestsForEntity($input: TakedownRequestsForEntityInput!) {
		takedownRequestsForEntity(input: $input) {
			...TakedownRequestWithoutEntity
		}
	}
	${TakedownRequestFragments.takedownRequestWithoutEntity}
`;

interface QueryData {
	takedownRequestsForEntity: TakedownRequest[];
}
interface QueryVariables {
	input: {
		entityType: EntityType;
		entityId: string;
	};
}
interface Props {
	entity: Entity;
}

const RequestTakedownButton = ({ entity }: Props) => {
	const { currentUser, requireLogin } = useRequireLogin();

	const [modalIsVisible, setModalIsVisible] = useState(false);
	const closeModal = useCallback(() => setModalIsVisible(false), []);

	const { loading, data, error, refetch } = useQuery<QueryData, QueryVariables>(
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
	const takedownRequests = data?.takedownRequestsForEntity ?? [];

	const onButtonClicked = useCallback(async () => {
		if (!currentUser) {
			const redirectTo = EntityService.makeHrefForView(entity);
			await requireLogin({ redirectTo });
		} else {
			setModalIsVisible(true);
		}
	}, [currentUser, entity, requireLogin]);

	const modalContent = useMemo(() => {
		const pendingTakedown = takedownRequests.find(isPendingTakedownRequest);
		const approvedTakedown = takedownRequests.find(isApprovedTakedownRequest);

		if (loading) {
			return <LoadingBlock />;
		} else if (error) {
			return (
				<div className="text-red-600">Error fetching Takedown Request data</div>
			);
		} else if (approvedTakedown) {
			return (
				<div className="text-gray-500">
					This {entity.entityType} has an <strong>approved</strong>{" "}
					{approvedTakedown.type} Takedown Request last updated{" "}
					{DateTimeService.formatDateYearTime(approvedTakedown.updatedAt)}
				</div>
			);
		} else if (pendingTakedown) {
			return (
				<div className="text-gray-500">
					This {entity.entityType} has a <strong>pending</strong>{" "}
					{pendingTakedown.type} Takedown Request last updated{" "}
					{DateTimeService.formatDateYearTime(pendingTakedown.updatedAt)}
				</div>
			);
		}
		return (
			<>
				<div className="text-gray-500 mb-5">
					We exist as a community resource, and as such we place the foremost
					importance on performers' rights and copyright. You can request a
					takedown using this form. We will be in touch to verify details.
				</div>

				<CreateTakedownRequestForm
					entity={entity}
					onSuccess={() => refetch()}
				/>
			</>
		);
	}, [loading, error, takedownRequests, refetch, entity]);

	return (
		<>
			<span
				className="rounded flex flex-row items-center p-2"
				onClick={onButtonClicked}
			>
				<i className="material-icons mr-0.5">report_problem</i>
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
