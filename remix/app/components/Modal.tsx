import React from "react";
import { useHotkeys } from "react-hotkeys-hook";

interface Props {
	children: React.ReactNode;
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
				className={`bg-white cursor-auto rounded relative w-full px-4 pb-4 pt-3 m-2 max-h-9/10 overflow-y-auto overflow-x-hidden md:max-w-md ${
					className ?? ""
				}`}
			>
				<div className="flex flex-row justify-between items-center mb-4 text-black">
					<h2>{title}</h2>

					<button
						className="btn-icon flex flex-row items-center justify-center ml-4 mb-0.5"
						onClick={onClose}
						aria-label="Close"
					>
						<span className="hidden md:block border border-gray-300 group-hover:border-gray-400 rounded text-xs px-1.5 ml-0.5 mr-3">
							ESC
						</span>
						<i className="material-icons">close</i>
					</button>
				</div>

				{/* Add some style resets so that the Modal's parent doesn't affect the content */}
				<div className="text-base text-black font-normal whitespace-normal text-left cursor-auto">
					{children}
				</div>
			</div>
		</div>
	);
};

export default Modal;
