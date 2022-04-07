import { ChangeEventHandler } from "react";

interface Props {
	checked: boolean;
	label: string;
	id?: string;
	onChange: ChangeEventHandler<HTMLInputElement>;
	className?: string;
}

const Checkbox = ({ checked, label, id, onChange, className }: Props) => {
	const inputId = id ?? `input_${Math.round(Math.random() * 100000)}`;

	return (
		<div className={`flex flex-row items-top justify-start ${className ?? ""}`}>
			<input
				type="checkbox"
				checked={checked}
				onChange={onChange}
				id={inputId}
				className="mt-1 mr-2"
			/>
			<label htmlFor={inputId}>{label}</label>
		</div>
	);
};

export default Checkbox;
