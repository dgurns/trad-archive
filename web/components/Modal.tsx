import { useHotkeys } from "react-hotkeys-hook";

interface Props {
	children: React.ReactChild | React.ReactChild[];
	isVisible: boolean;
	onClose: () => void;
	title?: string;
	className?: string;
}

const Modal = ({
	children,
	isVisible = false,
	onClose,
	title,
	className,
}: Props) => {
	// Close the modal when escape key is pressed, even if a form field is focused
	useHotkeys(
		"esc",
		onClose,
		{
			enableOnTags: ["INPUT", "TEXTAREA"],
		},
		[onClose]
	);

	if (!isVisible) {
		return null;
	}

	return (
		<div
			className={`${
				isVisible ? "visible" : "hidden"
			} z-40 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center`}
		>
			<div
				className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-40"
				onClick={onClose}
			/>

			<div
				className={`bg-white rounded relative w-full p-4 m-2 max-h-9/10 overflow-y-auto overflow-x-hidden md:max-w-md ${
					className ?? ""
				}`}
			>
				<div className="flex flex-row justify-between items-center mb-4">
					<h1>{title}</h1>
					<button
						className="btn-icon flex flex-row items-center justify-center ml-4 mb-0.5"
						onClick={onClose}
					>
						<i className="material-icons">close</i>
					</button>
				</div>
				{children}
			</div>
		</div>
	);
};

export default Modal;
