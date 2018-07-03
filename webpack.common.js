const path = require('path');
const nodeExternals = require('webpack-node-externals'); // be required Express.js

module.exports = {
	server: {
		entry: './src/app.js',
		externals: [nodeExternals()],
		output: {
			path: path.resolve(__dirname, './.build'),
			filename: './app.js',
		},
	},
};
