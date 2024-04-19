const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const Dotenv = require('dotenv-webpack')
const commonConfig = require('./webpack.common.js')
const packageJson = require('../package.json')

//Cargo las variables de entorno: 
const fs = require('fs')
const path = require('path')
const envDevelopmentPath = path.resolve(__dirname, '../.env.development')
const envDevelopmentContent = fs.readFileSync(envDevelopmentPath, 'utf8')
const envDevelopment = require('dotenv').parse(envDevelopmentContent)

const devConfig = {
    mode: 'development',
    output: {
        publicPath: 'http://localhost:8073/'
    },
    devServer: {
        port: 8073,
        historyApiFallback: {
            index: '/index.html'
        }, 
        proxy: {
            '/api': {
                target: `${envDevelopment.REACT_APP_URL_SERVICIOS}${envDevelopment.REACT_APP_PORT_ESTADO_CIVIL}`,
                changeOrigin: true,
                pathRewrite: { '^/api': '' },
            },
        },
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
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new Dotenv(),
    ]
};

module.exports = merge(commonConfig, devConfig)