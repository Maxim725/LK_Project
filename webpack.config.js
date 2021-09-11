const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PORT = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
	mode: 'development',
	context: path.resolve(__dirname, 'src'),

	entry: {
		main: ['@babel/polyfill', './index.tsx'],
	},
	output: {
		filename: '[name].[hash].js',
		path: path.resolve(__dirname, 'production'),
		//! For react router dom
		// publicPath: '/'
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: "./index.html",

			minify: {
				collapseWhitespace: !isDev
			}
		}),
		new CleanWebpackPlugin()
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}, {
				test: /\.s[ac]ss$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			},
			//? обработка картинок
			{
				test: /\.(png|jpg|jpeg|svg|ico|gif)$/,
				type: 'asset/resource',
			},
			//? обработка шрифтов
			{
				test: /\.(ttf|woff|woff2|eot)$/,
				type: 'asset/resource',
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ['@babel/preset-env'],
						plugins: ['@babel/plugin-proposal-class-properties']
					}
				}
			},
			//? babel ts
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: ['@babel/preset-env', '@babel/preset-typescript'],
							plugins: ['@babel/plugin-proposal-class-properties']
						}
					},
					// // TODO: Лeчше переместить в режим разработки (сделать функцию лоадерс)
					//'eslint-loader'
				]
			},
			//? babel tsx
			{
				test: /\.tsx$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
							plugins: ['@babel/plugin-proposal-class-properties']
						}
					},
					// // TODO: Лeчше переместить в режим разработки (сделать функцию лоадерс)
					// 'eslint-loader'
				]
			}
		]
	},

	optimization: {
		splitChunks: {
			chunks: "all"
		}
	},

	resolve: {
		extensions: ['.tsx', '.ts', '.json', '.js'],
		alias: {
			'@': path.resolve(__dirname, 'src')
		}
	},

	devtool: isDev ? 'source-map' : 'hidden-nosources-source-map',
	devServer: {
		port: PORT,
		hot: isDev,
		//! React router dom не работает без этого
		historyApiFallback: true,
	},
}