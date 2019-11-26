const path = require('path');
const DIST_DIR = path.join(__dirname, '/client/dist');
const SRC_DIR = path.join(__dirname, '/client/src');

module.exports = {
	mode: 'development',
	entry: `${SRC_DIR}/index.js`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
	module: {
		rules: [
			{
        test: /\.jsx?$/, 
        resolve: {
          extensions: [".js", ".jsx"],
          enforceExtension: false
        },
				query: {
					presets: ['@babel/preset-env', '@babel/preset-react'],
					plugins: ['@babel/plugin-proposal-class-properties']
        },
          loader: 'babel-loader'
			}
		]
  }
};