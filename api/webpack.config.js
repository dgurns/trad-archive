const nodeExternals = require("webpack-node-externals");
const serverlessWebpack = require("serverless-webpack");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
	devtool: "inline-cheap-module-source-map",
	entry: serverlessWebpack.lib.entries,
	mode: serverlessWebpack.lib.webpack.isLocal ? "development" : "production",
	module: {
		rules: [
			{
				exclude: /node_modules/,
				test: /\.ts$/,
				// swc-loader *almost* works, but FieldResolvers don't get called.
				// Keep an eye on swc-loader, @swc/cli, and @swc/core as they evolve.
				// https://github.com/MichalLytek/type-graphql/issues/1006
				use: "ts-loader",
			},
		],
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{
					from: "src/migrations",
					to: "src/migrations",
				},
			],
		}),
	],
	node: false,
	externals: [nodeExternals()],
	optimization: {
		minimize: false,
	},
	resolve: {
		extensions: [".ts", ".js"],
		modules: ["src", "node_modules"],
	},
	target: "node",
};
