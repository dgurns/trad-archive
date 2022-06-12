import { Link } from "@remix-run/react";

interface BreadcrumbItem {
	label: string;
	href?: string;
}

interface Props {
	items: BreadcrumbItem[];
	className?: string;
}

const Breadcrumb = ({ items = [], className }: Props) => {
	if (items.length === 0) {
		return null;
	}
	if (items.length === 1) {
		return <h1 className={className ?? ""}>{items[0].label}</h1>;
	}

	const subItems = items.slice(0, items.length - 1);
	const finalItem = items[items.length - 1];

	return (
		<div className={`flex flex-col ${className ?? ""}`}>
			<div className="flex flex-row items-center mb-1">
				{subItems.map(({ label, href }, index) => (
					<div className="flex" key={index}>
						{href ? (
							<Link to={href}>{label}</Link>
						) : (
							<span className="text-gray-500">{label}</span>
						)}
						<i className="material-icons text-gray-500 text-base ml-1">
							keyboard_arrow_right
						</i>
					</div>
				))}
			</div>

			<h1>{finalItem.label}</h1>
		</div>
	);
};

export default Breadcrumb;
