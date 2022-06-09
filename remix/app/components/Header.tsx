import { Link } from "@remix-run/react";
import { SearchIcon, TrendingUpIcon } from "@heroicons/react/outline";

export default function Header() {
	return (
		<>
			<div className="flex flex-row py-3 px-4 justify-between items-center bg-teal-700">
				<div className="flex flex-row">
					<Link
						to="/"
						className="whitespace-nowrap no-underline hover:no-underline text-yellow-200 hover:text-gray-400"
					>
						Trad Archive
					</Link>
					<button className="text-white flex flex-row items-center whitespace-nowrap hover:text-gray-400 group ml-4">
						<SearchIcon className="h-5 block" />
						<span className="hidden md:block md:pl-1">Search</span>
						<span className="hidden md:block border border-gray-300 group-hover:border-gray-400 rounded text-xs px-1.5 ml-2.5">{`/`}</span>
					</button>
					<Link
						to="/entities/audio-items/random"
						className="flex flex-row items-center no-underline text-white hover:text-gray-400 ml-4"
					>
						<TrendingUpIcon className="h-5 block" />
						<div className="md:pl-2 hidden md:block">Random</div>
					</Link>
				</div>
			</div>
		</>
	);
}
