interface Props {
	className?: string;
}

const Filters = ({ className }: Props) => {
	return (
		<div className="flex flex-row justify-end items-center">
			<div
				className={`flex flex-row justify-end items-center mb-6 ${
					className ?? ""
				}`}
			>
				<div className="flex flex-row items-center">
					Sort by
					<select className="ml-2" value="1" onChange={() => {}}>
						<option value="1">Recently tagged</option>
						<option value="2">Recently added</option>
						<option value="3">Most saved</option>
					</select>
				</div>

				<div className="flex flex-row items-center ml-6">
					View as
					<select className="ml-2" value="1" onChange={() => {}}>
						<option value="1">Cards</option>
						<option value="2">Compact</option>
						<option value="3">Text only</option>
					</select>
				</div>
			</div>
		</div>
	);
};

export default Filters;
