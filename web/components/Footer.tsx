const Footer = () => (
	<div className="flex flex-col items-start w-full p-4 pt-7 pb-24 bg-gray-900 text-gray-100">
		<div className="mb-4">
			This project is a collaboration between the{" "}
			<a href="https://www.itma.ie/" target="_blank">
				Irish Traditional Music Archive{" "}
				<i className="material-icons text-sm">launch</i>
			</a>{" "}
			and{" "}
			<a href="https://dangurney.net" target="_blank">
				Dan Gurney <i className="material-icons text-sm">launch</i>
			</a>
		</div>

		<div className="mb-4">
			Special thanks to{" "}
			<a href="https://thesession.org/" target="_blank">
				The Session <i className="material-icons text-sm">launch</i>
			</a>{" "}
			for providing tune data.
		</div>

		<div className="mb-4">
			All of the code is open source on{" "}
			<a href="https://github.com/dgurns/trad-archive" target="_blank">
				GitHub <i className="material-icons text-sm">launch</i>
			</a>
			. We welcome community contributors.
		</div>

		<div>
			<a
				href="https://github.com/dgurns/trad-archive/discussions"
				target="_blank"
			>
				Share feedback or report a bug{" "}
				<i className="material-icons text-sm">launch</i>
			</a>
		</div>
	</div>
);

export default Footer;
