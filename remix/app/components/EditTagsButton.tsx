import { useState, useCallback, useMemo, useEffect } from "react";

import { type TagWithRelations } from "~/types";
import DateTimeService from "~/services/DateTime";
import TagService from "~/services/Tag";

import Modal from "~/components/Modal";
import { useFetcher } from "@remix-run/react";

interface Props {
	tags: TagWithRelations[];
	className?: string;
	children?: React.ReactChild | React.ReactChild[];
	onSuccess?: () => void;
}
const EditTagsButton = ({ tags, className, children, onSuccess }: Props) => {
	const fetcher = useFetcher<{ error?: string }>();
	const isSubmittingOrLoading =
		fetcher.state === "submitting" || fetcher.state === "loading";
	const data = fetcher.data;
	useEffect(() => {
		if (onSuccess && data && !data.error && !isSubmittingOrLoading) {
			onSuccess();
		}
	}, [data, isSubmittingOrLoading, onSuccess]);

	const [modalIsVisible, setModalIsVisible] = useState(false);

	const onDeleteTag = useCallback(async (id: string) => {
		if (window.confirm("Are you sure you want to delete this Tag?")) {
			await fetcher.submit(
				{ tagId: id },
				{ method: "delete", action: "/tags" }
			);
		}
	}, []); // intentionally leave out fetcher from deps array since it triggers unwanted re-renders

	useEffect(() => {
		if (data?.error) {
			window.alert(`Error deleting Tag: ${data.error}`);
		}
	}, [data]);

	const sortedTags = useMemo(() => {
		if (!Array.isArray(tags)) {
			return [];
		}
		return TagService.sort(tags);
	}, [tags]);

	if (!sortedTags || sortedTags.length === 0) {
		return null;
	}

	return (
		<>
			<button
				className={`btn-text whitespace-pre ${className ?? ""}`}
				onClick={() => setModalIsVisible(true)}
			>
				{children ?? "Edit Tags"}
			</button>

			<Modal
				title="Edit Tags"
				isVisible={modalIsVisible}
				onClose={() => setModalIsVisible(false)}
			>
				{sortedTags.map((tag, index) => {
					const { id, relationship, subjectTimeMarkerSeconds } = tag;
					const objectEntity = TagService.getObjectEntity(tag);
					if (!objectEntity) {
						return null;
					}
					return (
						<div
							className="flex flex-row items-start justify-start"
							key={index}
						>
							<div className="flex flex-col flex-1 justify-start align-start mb-4 pr-4">
								<div className="italic text-gray-500">{relationship.name}</div>
								<div className="uppercase text-sm text-gray-500 pr-2">
									{objectEntity.entityType}
								</div>
								{objectEntity.name}
								{typeof subjectTimeMarkerSeconds === "number" && (
									<span className="italic text-gray-500">
										{`at ${DateTimeService.formatSecondsAsDuration(
											subjectTimeMarkerSeconds
										)}`}
									</span>
								)}
							</div>
							<button
								className="btn-text"
								onClick={() => onDeleteTag(id)}
								disabled={fetcher.state !== "idle"}
							>
								Delete Tag
							</button>
						</div>
					);
				})}
			</Modal>
		</>
	);
};

export default EditTagsButton;
