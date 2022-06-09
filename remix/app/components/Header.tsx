import { Link } from "@remix-run/react";

export default function Header() {
	return (
		<>
			<div className="flex flex-row py-3 px-4 justify-between text-white items-center bg-teal-700">
				<div className="flex flex-row">
					<Link
						to="/"
						className="btn-text text-current whitespace-nowrap text-yellow-200 hover:text-gray-400"
					>
						Trad Archive
					</Link>
					<button className="btn-text text-current flex flex-row items-center whitespace-nowrap hover:text-gray-400 group ml-4">
						<i className="material-icons">search</i>
						<span className="hidden md:block md:pl-1">Search</span>
						<span className="hidden md:block border border-gray-300 group-hover:border-gray-400 rounded text-xs px-1.5 ml-2.5">{`/`}</span>
					</button>
					<Link
						to="/entities/audio-items/random"
						className="flex flex-row items-center link-bare text-current text-white hover:text-gray-400 ml-4"
					>
						<div className="block h-6">
							<i className="material-icons">shuffle</i>
						</div>
						<div className="md:pl-2 hidden md:block">Random</div>
					</Link>
				</div>
			</div>
		</>
	);
}
