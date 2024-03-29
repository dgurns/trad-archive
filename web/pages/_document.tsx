import Document, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
} from "next/document";

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html lang="en">
				<Head>
					<link rel="icon" href="/favicon.ico" />
					<link rel="dns-prefetch" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com/" />
					<link
						href="https://fonts.googleapis.com/icon?family=Material+Icons"
						rel="preload"
						as="style"
					/>
					<link
						href="https://fonts.googleapis.com/icon?family=Material+Icons"
						rel="stylesheet"
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Karla:wght@400;700&display=swap"
						rel="preload"
						as="style"
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Karla:wght@400;700&display=swap"
						rel="stylesheet"
					/>
				</Head>
				<body className="bg-gray-100">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
