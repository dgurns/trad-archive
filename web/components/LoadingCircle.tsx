interface Props {
  className?: string;
}

const LoadingCircle = ({ className }: Props) => (
  <div>
    <i
      className={`material-icons animate-spin text-gray-500 ${className ?? ''}`}
    >
      scatter_plot
    </i>
  </div>
);

export default LoadingCircle;
