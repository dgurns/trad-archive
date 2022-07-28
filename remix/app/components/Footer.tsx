export default function Footer() {
	return (
		<div className="flex flex-col items-start w-full p-4 pt-7 pb-24 bg-gray-900 text-gray-100 space-y-4">
			<div>
				This project is a collaboration between the{" "}
				<a href="https://www.itma.ie/" target="_blank" rel="noreferrer">
					Irish Traditional Music Archive ↗
				</a>{" "}
				and{" "}
				<a href="https://dangurney.net" target="_blank" rel="noreferrer">
					Dan Gurney ↗
				</a>
			</div>

			<div>
				Special thanks to{" "}
				<a href="https://thesession.org/" target="_blank" rel="noreferrer">
					The Session ↗
				</a>{" "}
				for providing tune data.
			</div>

			<div>
				All of the code is open source on{" "}
				<a
					href="https://github.com/dgurns/trad-archive"
					target="_blank"
					rel="noreferrer"
				>
					GitHub ↗
				</a>
				. We welcome community contributors.
			</div>

			<div>
				<a href="mailto:dan@dangurney.net" target="_blank" rel="noreferrer">
					Share feedback or request a takedown ↗
				</a>
			</div>
		</div>
	);
}
