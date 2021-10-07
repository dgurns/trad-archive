import { useMemo, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useHotkeys } from "react-hotkeys-hook";

import { Entity } from "types";
import useCurrentUser from "hooks/useCurrentUser";
import UserService from "services/User";
import EntityService from "services/Entity";

import Modal from "components/Modal";
import SearchEntities from "components/SearchEntities";

const Header = () => {
	const router = useRouter();

	const [currentUser, { loading }] = useCurrentUser();

	const [searchModalIsVisible, setSearchModalIsVisible] = useState(false);

	const openSearchModal = (event) => {
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
			router.push(EntityService.makeHrefForView(entity));
		},
		[router]
	);

	const onNewEntityCreated = useCallback(
		(entity: Entity) => {
			router.push(EntityService.makeHrefForView(entity));
		},
		[router]
	);

	const userActions = useMemo(() => {
		if (loading || typeof currentUser === "undefined") {
			return null;
		} else if (currentUser) {
			return (
				<div className="flex flex-row items-center">
					<Link href="/saved-items">
						<a className="btn-text text-current flex flex-row items-center whitespace-nowrap hover:text-gray-400 ml-4">
							<i className="material-icons">bookmark</i>
							<span className="hidden md:block md:pl-1">Saved</span>
						</a>
					</Link>
					{UserService.isAdmin(currentUser) && (
						<Link href="/admin">
							<a className="btn-text text-current flex flex-row items-center whitespace-nowrap hover:text-gray-400 ml-4">
								<i className="material-icons">manage_accounts</i>
								<span className="hidden md:block md:pl-1">Admin</span>
							</a>
						</Link>
					)}
					<Link href="/account">
						<a className="btn-text text-current flex flex-row items-center whitespace-nowrap hover:text-gray-400 ml-4">
							<i className="material-icons">account_circle</i>
							<span className="hidden md:block md:pl-1">Account</span>
						</a>
					</Link>
				</div>
			);
		} else {
			return (
				<div>
					<Link href="/login">
						<a className="btn-text text-current whitespace-nowrap hover:text-gray-400 ml-4">
							Log In
						</a>
					</Link>
					<Link href="/signup">
						<a className="btn text-current no-underline whitespace-nowrap hover:text-current ml-4">
							Sign Up
						</a>
					</Link>
				</div>
			);
		}
	}, [loading, currentUser]);

	return (
		<>
			<div
				className="flex flex-row py-3 px-4 justify-between text-white items-center bg-teal-700"
				suppressHydrationWarning
			>
				<div className="flex flex-row">
					<Link href="/">
						<a className="btn-text text-current whitespace-nowrap text-yellow-200 hover:text-gray-400">
							Trad Archive
						</a>
					</Link>
					<button
						className="btn-text text-current flex flex-row items-center whitespace-nowrap hover:text-gray-400 group ml-4"
						onClick={openSearchModal}
					>
						<i className="material-icons">search</i>
						<span className="hidden md:block md:pl-1">Search</span>
						<span className="hidden md:block border border-gray-300 group-hover:border-gray-400 rounded text-xs px-1.5 ml-2.5">{`/`}</span>
					</button>
					<Link href="/entities/audio-items/random">
						<a className="flex flex-row items-center link-bare text-current text-white hover:text-gray-400 ml-4">
							<div className="block h-6">
								<i className="material-icons">shuffle</i>
							</div>
							<div className="md:pl-2 hidden md:block">Random</div>
						</a>
					</Link>
				</div>

				{userActions}
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
