const { merge } = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common.js')
const packageJson = require('../package.json')

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: '/contrataciones/latest/'
    },   
    plugins: [
        new ModuleFederationPlugin({
            name: 'contrataciones',
            filename: 'remoteEntry.js',
            exposes: {
                './ContratacionesApp': './src/bootstrap' 
            },
            remotes: {
                callcenter: `callcenter@${domain}/callcenter/latest/remoteEntry.js`,
            },
            shared: packageJson.dependencies
        }),
    ]
};

module.exports = merge(commonConfig, prodConfig)