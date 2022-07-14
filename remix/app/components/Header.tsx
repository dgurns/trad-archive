import React, { useState, useCallback } from "react";
import { Link } from "@remix-run/react";
import { useNavigate } from "@remix-run/react";
import { useHotkeys } from "react-hotkeys-hook";

import type { Entity } from "~/types";
import EntityService from "~/services/Entity";

import Modal from "~/components/Modal";
import SearchEntities from "~/components/SearchEntities";
import type { User } from "@prisma/client";

interface Props {
	currentUser?: User | null;
}

const Header = ({ currentUser }: Props) => {
	const navigate = useNavigate();

	const [searchModalIsVisible, setSearchModalIsVisible] = useState(false);

	const openSearchModal = (
		event: KeyboardEvent | React.SyntheticEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
		setSearchModalIsVisible(true);
	};
	const closeSearchModal = () => {
		setSearchModalIsVisible(false);
	};

	useHotkeys("/", openSearchModal);

	const onSelectSearchResult = useCallback(
		(entity: Entity) => {
			setSearchModalIsVisible(false);
			navigate(EntityService.makeHrefForView(entity));
		},
		[navigate]
	);

	const onNewEntityCreated = useCallback(
		(entity: Entity) => {
			navigate(EntityService.makeHrefForView(entity));
		},
		[navigate]
	);

	return (
		<>
			<div className="flex flex-row py-3 px-4 justify-between text-white items-center bg-teal-700">
				<div className="flex flex-row">
					<Link
						to="/"
						className="whitespace-nowrap no-underline text-yellow-200 hover:text-gray-400"
					>
						Trad Archive
					</Link>
					<button
						className="flex flex-row items-center whitespace-nowrap text-white hover:text-gray-400 group ml-4"
						onClick={openSearchModal}
					>
						<i className="material-icons">search</i>
						<span className="hidden md:block md:pl-1">Search</span>
						<span className="hidden md:block border border-gray-300 group-hover:border-gray-400 rounded text-xs px-1.5 ml-2.5">{`/`}</span>
					</button>
					<Link
						to="/entities/audio-items/random"
						className="flex flex-row items-center no-underline text-white hover:text-gray-400 ml-4"
					>
						<div className="block h-6">
							<i className="material-icons">shuffle</i>
						</div>
						<div className="md:pl-2 hidden md:block">Random</div>
					</Link>
				</div>

				{!currentUser ? (
					<div>
						<Link
							to="/login"
							className="whitespace-nowrap text-white no-underline hover:text-gray-400 ml-4"
						>
							Log In
						</Link>
						<Link
							to="/signup"
							className="btn text-current no-underline whitespace-nowrap hover:text-current ml-4"
						>
							Sign Up
						</Link>
					</div>
				) : (
					<div className="flex flex-row items-center">
						<Link
							to="/saved-items"
							className="flex flex-row items-center whitespace-nowrap text-white no-underline hover:text-gray-400 ml-4"
						>
							<i className="material-icons">bookmark</i>
							<span className="hidden md:block md:pl-1">Saved</span>
						</Link>
						<Link
							to="/account"
							className="flex flex-row items-center whitespace-nowrap text-white no-underline hover:text-gray-400 ml-4"
						>
							<i className="material-icons">account_circle</i>
							<span className="hidden md:block md:pl-1">Account</span>
						</Link>
					</div>
				)}
			</div>

			<Modal
				title="Search"
				isVisible={searchModalIsVisible}
				onClose={closeSearchModal}
			>
				<SearchEntities
					onSelect={onSelectSearchResult}
					onNewEntityCreated={onNewEntityCreated}
				/>
			</Modal>
		</>
	);
};

export default Header;
