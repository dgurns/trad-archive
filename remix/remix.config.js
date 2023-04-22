/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
	publicPath: process.env.NODE_ENV === "development" ? undefined : "/build/",
	serverBuildPath:
		process.env.NODE_ENV === "development" ? undefined : "api/index.js",
	serverMainFields:
		process.env.NODE_ENV === "development" ? undefined : "main, module",
	serverModuleFormat:
		process.env.NODE_ENV === "development" ? undefined : "cjs",
	serverPlatform: process.env.NODE_ENV === "development" ? undefined : "node",
	serverMinify: false,
	ignoredRouteFiles: ["**/.*"],
	future: {
		v2_errorBoundary: true,
		v2_normalizeFormMethod: true,
		v2_meta: true,
		v2_routeConvention: true,
	},
};
