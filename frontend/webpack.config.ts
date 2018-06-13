import * as webpack from "webpack";
import * as path from "path";
import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer";

const isProduction = process.env.NODE_ENV === "production";
const analyze = process.env.ANALYZE === "true";

console.log(process.env.NODE_ENV + " -> " + (isProduction ? "PROD" : "DEV") + (analyze ? " WITH_ANALYZE" : ""));

const config = {
	resolve: {
		// .js is required for react imports.
		// .tsx is for our app entry point.
		// .ts is optional, in case you will be importing any regular ts files.
		extensions: [".js", ".ts", ".tsx"]
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "tslint-loader",
				enforce: "pre"
			},
			{
				// Set up ts-loader for .ts/.tsx files and exclude any imports from node_modules.
				test: /\.tsx?$/,
				loaders: isProduction ? ["ts-loader"] : ["react-hot-loader/webpack", "ts-loader"],
				exclude: /node_modules/
			}
		]
	},
	entry: [
		// Set index.tsx as application entry point.
		"./index.tsx"
	],
	output: {
		path: path.resolve(__dirname) + "/dist",
		filename: "bundle.js"
	},
	devServer: {
		proxy: {
			"/api": {
				target: "http://localhost:8000"
			}
		},
		contentBase: path.resolve(__dirname) + "/public"
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development")
			}
		})
	]
};

if (!isProduction) {
	config.plugins.unshift(
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin()
	);
	config.devServer.hot = true;
} else {
	config.plugins.push(
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false
		}),
		new webpack.optimize.UglifyJsPlugin({
			extractComments: true
		})
	);
}
if (analyze) {
	config.plugins.unshift(
		new BundleAnalyzerPlugin()
	);
}

module.exports = config;
