interface Props {
	className?: string;
	onClose?: () => void;
}

const ProjectIntro = ({ className, onClose }: Props) => {
	return (
		<div
			className={`flex flex-col flex-grow bg-gray-200 rounded p-4 relative ${
				className ?? ""
			}`}
		>
			<strong>Welcome!</strong>
			<br />
			Trad Archive is an open source experiment by the Irish Traditional Music
			Archive and Dan Gurney.
			<br />
			<br />
			You can...
			<br />
			<ul className="list-disc list-inside">
				<li>Listen to previously unreleased archival recordings</li>
				<li>
					Help by tagging each recording with People, Places, Tunes,
					Instruments, and Collections
				</li>
				<li>Save favorites to listen later</li>
			</ul>
			<button className="absolute top-2 right-2 btn-icon" onClick={onClose}>
				<i className="material-icons">close</i>
			</button>
		</div>
	);
};

export default ProjectIntro;
