import React, { useRef, useEffect, useState, useCallback } from "react";

// Menu is a simple overlay menu that displays whatever menu items are passed to
// it as children. For example, you can use it like:
//
// <Menu>
//	 <span onClick={doSomething}>Option 1</span>
//	 <span onClick={doSomethingElse}>Option 2</span>
// </Menu>

interface Props {
	children: React.ReactNode | React.ReactNode[];
}

const Menu = ({ children }: Props) => {
	const containerRef = useRef<HTMLDivElement>();

	const [shouldOpenLeft, setShouldOpenLeft] = useState(true);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const container = containerRef.current;
		if (container) {
			const { x } = container.getBoundingClientRect();
			if (x < 200) {
				setShouldOpenLeft(false);
			}
		}
	}, []);

	const onIconClicked = useCallback((event) => {
		event.stopPropagation();
		setIsOpen(true);
	}, []);

	const onBackgroundClicked = useCallback((event) => {
		event.stopPropagation();
		setIsOpen(false);
	}, []);

	const childrenAsArray = Array.isArray(children) ? children : [children];

	if (!children) {
		return null;
	}

	return (
		<div className="relative" ref={containerRef}>
			<button
				className="btn-secondary"
				onClick={onIconClicked}
				aria-label={isOpen ? "Close Menu" : "Show Menu"}
			>
				<i className="material-icons">expand_more</i>
			</button>

			{isOpen && (
				<>
					<div
						className="fixed top-0 right-0 bottom-0 left-0"
						onClick={onBackgroundClicked}
					/>

					<ul
						className={`absolute top-9 ${
							shouldOpenLeft ? "right-0 text-right" : "left-0 text-left"
						} flex flex-col bg-white rounded shadow-xl`}
					>
						{childrenAsArray.map((child, index) => (
							<li
								className={`cursor-pointer first:rounded-t last:rounded-b text-sm text-gray-500 font-bold whitespace-nowrap hover:bg-gray-200 ${
									index === 0 ? "hover:rounded-t" : ""
								} ${
									index === childrenAsArray.length - 1 ? "hover:rounded-b" : ""
								}`}
								key={index}
							>
								{child}
							</li>
						))}
					</ul>
				</>
			)}
		</div>
	);
};

export default Menu;
