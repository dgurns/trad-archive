import { useCallback, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useLazyQuery, gql } from "@apollo/client";

import { AudioItem, Comment, EntityType } from "types";
import { CommentFragments } from "fragments";
import DateTimeService from "services/DateTime";
import { AUDIO_ITEM_QUERY } from "hooks/useAudioItem";

import Modal from "components/Modal";
import CreateCommentForm from "components/CreateCommentForm";
import LoadingCircle from "components/LoadingCircle";

const COMMENTS_FOR_PARENT_ENTITY_QUERY = gql`
	query CommentsForParentEntity($input: CommentsForParentEntityInput!) {
		commentsForParentEntity(input: $input) {
			...Comment
		}
	}
	${CommentFragments.comment}
`;

interface QueryData {
	commentsForParentEntity: Comment[];
}
interface QueryVariables {
	input: {
		parentEntityType: EntityType;
		parentEntityId: string;
	};
}
interface Props {
	audioItem: AudioItem;
}
const ViewComments = ({ audioItem }: Props) => {
	const { id, slug, entityType, commentsCount } = audioItem;

	const commentsRef = useRef<HTMLDivElement>();

	const [modalIsVisible, setModalIsVisible] = useState(false);

	const [refetchAudioItem] = useLazyQuery(AUDIO_ITEM_QUERY, {
		fetchPolicy: "network-only",
	});

	const [getComments, { loading, data, error }] = useLazyQuery<
		QueryData,
		QueryVariables
	>(COMMENTS_FOR_PARENT_ENTITY_QUERY, {
		fetchPolicy: "cache-and-network",
	});
	const comments = data?.commentsForParentEntity ?? [];

	const fetchComments = useCallback(() => {
		getComments({
			variables: {
				input: { parentEntityType: entityType, parentEntityId: id },
			},
		});
	}, [getComments]);

	const onViewCommentsClicked = useCallback(() => {
		if (commentsCount !== comments.length) {
			fetchComments();
		}
		setModalIsVisible(true);
	}, [fetchComments, commentsCount, comments]);

	const onCreateCommentSuccess = useCallback(async () => {
		await fetchComments();
		await refetchAudioItem({ variables: { slug } });
	}, [fetchComments, refetchAudioItem]);

	const onCloseModal = useCallback(() => setModalIsVisible(false), []);

	useEffect(() => {
		// If comments have loaded, scroll to the bottom
		if (!commentsRef.current) {
			return;
		}
		const commentsHeight = commentsRef.current?.scrollHeight ?? 0;
		if (modalIsVisible && commentsHeight > 0 && comments.length > 0) {
			commentsRef.current.scrollTo({
				top: commentsHeight,
				behavior: "smooth",
			});
		}
	}, [comments, modalIsVisible]);

	const modalTitle =
		commentsCount > 0
			? `${commentsCount} Comment${commentsCount === 1 ? "" : "s"}`
			: "No Comments";

	return (
		<>
			<button className="btn-secondary" onClick={onViewCommentsClicked}>
				<i className="material-icons mr-0.5">chat_bubble_outline</i>
				{commentsCount > 0 ? (
					<>
						{commentsCount}
						<span className="hidden md:block md:pl-1">
							Comment{commentsCount === 1 ? "" : "s"}
						</span>
					</>
				) : (
					<>
						<span className="md:hidden">0</span>
						<span className="hidden md:block">No Comments</span>
					</>
				)}
			</button>

			<Modal
				title={modalTitle}
				isVisible={modalIsVisible}
				onClose={onCloseModal}
			>
				{error && <div className="text-red-600 mb-2">{error.message}</div>}

				{comments.length > 0 && (
					<div className="max-h-1/2 overflow-auto" ref={commentsRef}>
						{comments.map(({ createdByUser, createdAt, text }, index) => (
							<div className="mb-2" key={index}>
								<div className="text-gray-500 text-sm mb-1">
									<Link href={`/users/${createdByUser.id}`}>
										{createdByUser.username}
									</Link>{" "}
									{DateTimeService.formatDateYearTime(createdAt)}
								</div>
								<div className="text-sm">{text}</div>
							</div>
						))}
					</div>
				)}

				{loading && <LoadingCircle />}

				<div className="mt-4">
					<CreateCommentForm
						parentEntity={audioItem}
						onSuccess={onCreateCommentSuccess}
					/>
				</div>
			</Modal>
		</>
	);
};

export default ViewComments;
