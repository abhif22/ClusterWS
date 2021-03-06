const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const CopyPkgJsonPlugin = require("copy-pkg-json-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")

let configs = {
    entry: {
        'index': './src/index.ts'
    },
    resolve: {
        extensions: [".ts"]
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].js',
        libraryTarget: 'commonjs2'
    },
    target: 'node',
    externals: [nodeExternals()],
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'tslint-loader',
                options: {
                    configFile: path.join(__dirname, './tslint.json'),
                    typeCheck: true,
                    tsConfigFile: path.join(__dirname, './tsconfig.json')
                }
            },
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                options: {
                    configFileName: path.join(__dirname, './tsconfig.json')
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: true
        }),
        new CopyPkgJsonPlugin({
            remove: ['devDependencies', 'scripts']
        }),
        new CopyWebpackPlugin([{
            from: 'README.md'
        }])
    ]
}

module.exports = configs