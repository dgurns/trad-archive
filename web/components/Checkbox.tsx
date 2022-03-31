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
		<div className={`flex-row items-center justify-start ${className ?? ""}`}>
			<input
				type="checkbox"
				checked={checked}
				onChange={onChange}
				id={inputId}
				className="mr-2"
			/>
			<label htmlFor={inputId}>{label}</label>
		</div>
	);
};

export default Checkbox;
