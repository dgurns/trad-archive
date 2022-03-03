interface Props {
	valueInSeconds: number;
	onChange: (valueInSeconds: number) => void;
	className?: string;
}

const TimestampInput = ({ valueInSeconds, onChange, className }: Props) => {
	const hrs = Math.floor(valueInSeconds / 3600);
	const mins = Math.floor((valueInSeconds - hrs * 3600) / 60);
	const secs = valueInSeconds - hrs * 3600 - mins * 60;

	const onChangeHrs = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newHrs = parseInt(event.target.value, 10) || 0;
		const newValueInSeconds = newHrs * 3600 + mins * 60 + secs;
		onChange(newValueInSeconds);
	};

	const onChangeMins = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newMins = parseInt(event.target.value, 10) || 0;
		const newValueInSeconds = hrs * 3600 + newMins * 60 + secs;
		onChange(newValueInSeconds);
	};

	const onChangeSecs = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newSecs = parseInt(event.target.value, 10) || 0;
		const newValueInSeconds = hrs * 3600 + mins * 60 + newSecs;
		onChange(newValueInSeconds);
	};

	return (
		<div className={`flex flex-row items-center ${className ?? ""}`}>
			<input
				type="number"
				id="hrs"
				className="flex max-w-[50px]"
				value={hrs || null}
				onChange={onChangeHrs}
			/>
			<label htmlFor="hours" className="px-2">
				hr{hrs !== 1 && "s"}
			</label>
			<input
				type="number"
				id="mins"
				className="flex max-w-[55px]"
				value={mins || null}
				onChange={onChangeMins}
			/>
			<label htmlFor="mins" className="px-2">
				min{mins !== 1 ? "s" : ""}
			</label>
			<input
				type="number"
				id="secs"
				className="flex max-w-[55px]"
				value={secs || null}
				onChange={onChangeSecs}
			/>
			<label htmlFor="secs" className="px-2">
				sec{secs !== 1 ? "s" : ""}
			</label>
		</div>
	);
};

export default TimestampInput;
