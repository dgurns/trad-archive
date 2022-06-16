interface Props {
	children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
	return (
		<div className="flex flex-col justify-start items-center">
			<div className="w-full min-h-screen lg:max-w-5xl px-4 pb-44">
				{children}
			</div>
		</div>
	);
};

export default Layout;
