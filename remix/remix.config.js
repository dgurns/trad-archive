/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
	publicPath: "/build/",
	serverBuildPath: "api/index.js",
	serverMainFields: ["main", "module"],
	serverModuleFormat: "cjs",
	serverPlatform: "node",
	serverMinify: false,
	ignoredRouteFiles: ["**/.*"],
	future: {
		v2_errorBoundary: true,
		v2_normalizeFormMethod: true,
		v2_meta: true,
		v2_routeConvention: true,
	},
};
