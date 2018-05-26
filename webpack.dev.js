const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ReloadServerPlugin = require('reload-server-webpack-plugin'); // add an instant server for development mode and automatically reload feature

module.exports = merge.multiple(common, {
	server: {
		mode: 'development',
		plugins: [
			new ReloadServerPlugin({
				script: './.build/app.js',
			})
		]
	}
});
