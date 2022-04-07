import { useEffect, useRef, useState } from "react";
import LoadingCircle from "components/LoadingCircle";

interface FileWithUploadUrl {
	file: File;
	uploadUrl: string;
}
interface Props {
	filesWithUploadUrls: FileWithUploadUrl[];
	onSuccess?: () => void;
}
const FileUploader = ({ filesWithUploadUrls, onSuccess }: Props) => {
	const queue = useRef<{
		pending: FileWithUploadUrl[];
		inProgress: FileWithUploadUrl[];
		failed: FileWithUploadUrl[];
		succeeded: FileWithUploadUrl[];
	}>({
		pending: filesWithUploadUrls,
		inProgress: [],
		failed: [],
		succeeded: [],
	});
	const [ticker, setTicker] = useState(0);

	const moveFromPendingToInProgress = (file: FileWithUploadUrl) => {
		const updated = { ...queue.current };
		updated.pending = updated.pending.filter(
			(f) => f.uploadUrl !== file.uploadUrl
		);
		updated.inProgress = [...updated.inProgress, file];
		queue.current = updated;
	};
	const moveFromInProgressToSucceeded = (file: FileWithUploadUrl) => {
		const updated = { ...queue.current };
		updated.inProgress = updated.inProgress.filter(
			(f) => f.uploadUrl !== file.uploadUrl
		);
		updated.succeeded = [...updated.succeeded, file];
		queue.current = updated;
	};
	const moveFromInProgressToFailed = (file: FileWithUploadUrl) => {
		const updated = { ...queue.current };
		updated.inProgress = updated.inProgress.filter(
			(f) => f.uploadUrl !== file.uploadUrl
		);
		updated.failed = [...updated.failed, file];
		queue.current = updated;
	};

	const uploadFile = async (f: FileWithUploadUrl) => {
		try {
			moveFromPendingToInProgress(f);
			await fetch(f.uploadUrl, {
				method: "PUT",
				body: f.file,
			});
			moveFromInProgressToSucceeded(f);
		} catch {
			moveFromInProgressToFailed(f);
		}
	};

	const checkForFilesToUpload = () => {
		if (queue.current.succeeded.length === filesWithUploadUrls.length) {
			if (onSuccess) {
				setTimeout(() => onSuccess(), 500);
			}
			return;
		}
		if (
			queue.current.pending.length === 0 ||
			queue.current.inProgress.length >= 2
		) {
			return;
		}
		uploadFile(queue.current.pending[0]);
	};

	useEffect(() => {
		const interval = setInterval(checkForFilesToUpload, 1000);
		return () => clearInterval(interval);
	}, [checkForFilesToUpload]);

	// Use the ticker to force re-renders of upload status
	useEffect(() => {
		const interval = setInterval(() => setTicker(ticker + 1), 1000);
		return () => clearInterval(interval);
	}, [ticker]);

	const renderFileStatus = (file: FileWithUploadUrl) => {
		if (queue.current.inProgress.includes(file)) {
			return <LoadingCircle />;
		} else if (queue.current.failed.includes(file)) {
			return <i className="material-icons text-red-600">error</i>;
		} else if (queue.current.succeeded.includes(file)) {
			return <i className="material-icons text-teal-600">check</i>;
		} else {
			return <i className="material-icons text-gray-500">schedule</i>;
		}
	};

	return (
		<div className="flex flex-col">
			<ul className="flex flex-col" key={ticker}>
				{filesWithUploadUrls.map((f, i) => (
					<li className="flex flex-row" key={i}>
						<div className="flex flex-1">{f.file.name}</div>
						{renderFileStatus(f)}
					</li>
				))}
			</ul>
		</div>
	);
};

export default FileUploader;
