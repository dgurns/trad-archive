interface Props {
	className?: string;
}

const LoadingCircle = ({ className }: Props) => (
	<div className="h-6">
		<i
			className={`material-icons animate-spin text-gray-500 ${className ?? ""}`}
		>
			scatter_plot
		</i>
	</div>
);

export default LoadingCircle;
