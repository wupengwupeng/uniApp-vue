const path = require("path");

function resolve(dir) {
	return path.join(__dirname, dir);
}

module.exports = {
	// devServer: {
	// 	host: '0.0.0.0',
	// 	disableHostCheck: true,
	// 	port: 8080,
	// 	proxy: {
	// 		'/api': {
	// 			target: 'http://192.168.10.60:9000/',
	// 			changeOrigin: true,
	// 		}
	// 	},
	// },
	chainWebpack: config => {
		config.resolve.alias
			.set("components", resolve("/src/components"))
	},
	configureWebpack: {
		resolve: {
			alias: {
				'@': resolve('/src'),
				// '@com': resolve('')
			},
		},
	},
}