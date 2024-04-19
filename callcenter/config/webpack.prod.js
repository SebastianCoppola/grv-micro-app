const { merge } = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common.js')
const packageJson = require('../package.json')

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: '/callcenter/latest/'
    },   
    plugins: [
        new ModuleFederationPlugin({
            name: 'callcenter',
            filename: 'remoteEntry.js',
            exposes: {
                './CallCenterApp': './src/bootstrap' 
            },
            shared: packageJson.dependencies
        }),
    ]
};

module.exports = merge(commonConfig, prodConfig)