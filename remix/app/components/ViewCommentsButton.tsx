import { useCallback, useState, useEffect, useRef } from "react";
import { Link } from "@remix-run/react";

import type { AudioItemWithRelations } from "~/types";
import DateTimeService from "~/services/DateTime";

import Modal from "~/components/Modal";
import CreateCommentForm from "~/components/CreateCommentForm";
interface Props {
	audioItem: AudioItemWithRelations;
}
const ViewCommentsButton = ({ audioItem }: Props) => {
	const { comments } = audioItem;
	const commentsCount = comments.length;

	const commentsRef = useRef<HTMLDivElement>();
	const [modalIsVisible, setModalIsVisible] = useState(false);

	const onViewCommentsButtonClicked = useCallback(async () => {
		setModalIsVisible(true);
	}, []);

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
			<button
				className="btn-secondary"
				onClick={onViewCommentsButtonClicked}
				aria-label="View Comments"
			>
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
				{comments.length > 0 && (
					<div className="max-h-1/2 overflow-auto">
						{comments.map(({ createdByUser, createdAt, text }, index) => (
							<div className="mb-2" key={index}>
								<div className="text-gray-500 text-sm mb-1 flex flex-row items-center">
									<Link
										to={`/users/${createdByUser?.id}`}
										className="mr-1 flex flex-row items-center"
									>
										<span>{createdByUser?.username}</span>
									</Link>{" "}
									{DateTimeService.formatDateYearTime(createdAt)}
								</div>
								<div className="text-sm whitespace-pre-line text-gray-900">
									{text}
								</div>
							</div>
						))}
					</div>
				)}

				<div className="mt-4">
					<CreateCommentForm parentAudioItem={audioItem} />
				</div>
			</Modal>
		</>
	);
};

export default ViewCommentsButton;
