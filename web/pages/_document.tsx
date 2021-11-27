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
			<Html lang="en" className="bg-gray-900">
				<Head>
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/icons/apple-touch-icon.png"
					/>
					<link rel="manifest" href="/icons/site.webmanifest" />
					<link
						rel="icon"
						type="image/png"
						sizes="32x32"
						href="/icons/favicon-32x32.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="16x16"
						href="/icons/favicon-16x16.png"
					/>
					<link rel="shortcut icon" href="/favicon.ico" />

					<link
						href="https://fonts.googleapis.com/icon?family=Material+Icons"
						rel="stylesheet"
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
