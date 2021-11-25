import "reflect-metadata";
import { connectToDatabase } from "./db";
import { initializeApolloServer } from "./server";

const start = async () => {
	const dbConnection = await connectToDatabase();
	const server = await initializeApolloServer();
	server
		.listen({ port: 4000 })
		.then(({ url }) => {
			console.log(`🚀 Server ready at ${url}`);
		})
		.catch(async () => await dbConnection.close());
};

start();
