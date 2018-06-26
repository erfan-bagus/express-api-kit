const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ReloadServerPlugin = require('reload-server-webpack-plugin'); // add an instant server for development mode and automatically reload feature

module.exports = merge.multiple(common, {
	server: {
		mode: 'development',
		watch: true,
		watchOptions: {
			ignored: /node_modules/,
			poll: true, // resolve not automatic rebuild
		},
		plugins: [
			new ReloadServerPlugin({
				script: './.build/app.js',
			}),
		],
	},
});
