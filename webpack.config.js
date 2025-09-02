/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
const pkg = require('./package.json');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const envConfigPath = path.resolve(__dirname, `./env/.env.${process.env.REACT_APP_ENV}`);

// Set NODE_ENV and BABEL_ENV if not already set in your environment
process.env.NODE_ENV = process.env.NODE_ENV || 'production';
process.env.BABEL_ENV = process.env.BABEL_ENV || 'production';

module.exports = {
	mode: process.env.NODE_ENV || 'production',
	devtool: 'source-map',
	devServer: {
		static: path.join(__dirname, 'dist'),
		compress: true,
		port: 3001,
	},
	entry: path.resolve(__dirname, 'src/index.tsx'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: `casino-widget-${pkg.version}.js`,
		clean: true,
	},
	resolve: {
		modules: ['./src/*', 'node_modules'],
		extensions: ['.tsx', '.ts', '.js', '.scss', '.css', '.html'],
		fallback: { fs: false },
		plugins: [new TsconfigPathsPlugin({})],
	},
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin()],
	},
	module: {
		rules: [
			{
				test: /\.(scss|sass|css)$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
							modules: false,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							//ident: 'postcss',
							postcssOptions: {
								// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
								plugins: () => [
									require('postcss-flexbugs-fixes'),
									require('postcss-preset-env')({
										autoprefixer: {
											flexbox: 'no-2009',
										},
										stage: 3,
									}),
									require('tailwindcss'),
								],
							},
						},
					},
					{
						loader: 'resolve-url-loader',
						options: {
							sourceMap: true,
						},
					},
					'sass-loader',
				],
				sideEffects: true,
			},
			{
				test: /\.(png|jpg|jpeg|gif|ico)$/i,
				exclude: /node_modules/,
				type: 'asset/resource',
			},
			{
				test: /\.(js)x?$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
				// all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
				test: /\.(ts)x?$/,
				loader: 'ts-loader',
				exclude: /\.test.(ts)x?$/,
			},
			{
				test: /\.svg$/i,
				use: [{
					loader: '@svgr/webpack',
					options: {
						dimensions: false,
					},
				}, 'file-loader?name=[name].[ext]'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Casino App',
			filename: 'index.html',
			template: 'public/index.html',
		}),
		new MiniCssExtractPlugin(),
		new CompressionPlugin(),
		new webpack.ProvidePlugin({
			process: 'process/browser',
		}),
		new webpack.DefinePlugin({}),
		new BundleAnalyzerPlugin({
			analyzerMode: 'disabled',
			generateStatsFile: true,
			statsFilename: 'bundle-stats.json',
		}),
		new Dotenv({ path: envConfigPath }),
	],
};
