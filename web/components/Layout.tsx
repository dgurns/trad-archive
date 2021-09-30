import { useRef, useEffect, useState } from "react";
import Head from "next/head";
import Header from "components/Header";
import Footer from "components/Footer";

const { NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF } = process.env;
interface Props {
	children: React.ReactNode;
	pageTitle?: string;
}

const Layout = ({ children, pageTitle }: Props) => {
	const shouldShowPreviewWarning =
		NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF !== "master";

	const fixedHeaderRef = useRef<HTMLDivElement>();
	const defaultFixedHeaderHeight = shouldShowPreviewWarning ? 76 : 48;
	const [fixedHeaderHeight, setFixedHeaderHeight] = useState(
		defaultFixedHeaderHeight
	);

	useEffect(() => {
		const fixedHeader = fixedHeaderRef.current;
		if (fixedHeader) {
			setFixedHeaderHeight(fixedHeader.offsetHeight);
		}
	}, []);

	return (
		<div style={{ paddingTop: fixedHeaderHeight }}>
			{pageTitle && (
				<Head>
					<title>{pageTitle}</title>
				</Head>
			)}

			<div className="flex flex-col justify-start items-center">
				<div className="w-full min-h-screen lg:max-w-5xl py-6 px-4 pb-44">
					{children}
				</div>
				<Footer />
			</div>

			{/* Add header to the DOM after child content so its modals overlay */}
			<div className="fixed top-0 right-0 left-0" ref={fixedHeaderRef}>
				{shouldShowPreviewWarning && (
					<div className="flex flex-row items-center justify-center py-1 px-4 bg-black text-white text-sm text-center">
						This is a preview version of the site with fake data.
					</div>
				)}
				<Header />
			</div>
		</div>
	);
};

export default Layout;
