import { useRef, useEffect, useState } from "react";
import Header from "components/Header";

const { NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF } = process.env;
interface Props {
	children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
	const shouldShowPreviewWarning =
		NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF !== "master";

	const fixedHeaderRef = useRef<HTMLDivElement>();
	const [fixedHeaderHeight, setFixedHeaderHeight] = useState(48);

	useEffect(() => {
		const fixedHeader = fixedHeaderRef.current;
		if (fixedHeader) {
			setFixedHeaderHeight(fixedHeader.offsetHeight);
		}
	}, []);

	return (
		<div style={{ paddingTop: fixedHeaderHeight }}>
			<div className="fixed top-0 right-0 left-0" ref={fixedHeaderRef}>
				{shouldShowPreviewWarning && (
					<div className="flex flex-row items-center justify-center py-1 px-4 bg-black text-white text-sm text-center">
						This is a preview version of the site with fake data.
					</div>
				)}
				<Header />
			</div>
			<div className="flex flex-col justify-start items-center">
				<div className="w-full lg:max-w-5xl py-6 px-4 pb-44">{children}</div>
			</div>
		</div>
	);
};

export default Layout;
