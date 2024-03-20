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
        publicPath: 'http://localhost:8071/'
    },
    devServer: {
        port: 8071,
        historyApiFallback: {
            index: '/index.html'
        },
        proxy: {
            '/api': {
                target: `${envDevelopment.REACT_APP_URL_SERVICIOS}${envDevelopment.REACT_APP_PORT_LOGIN}`,
                changeOrigin: true,
                pathRewrite: { '^/api': '' },
            },
        },
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'login',
            filename: 'remoteEntry.js',
            exposes: {
                './LoginApp': './src/bootstrap' 
            },
            shared: packageJson.dependencies
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new Dotenv()
    ]
};

module.exports = merge(commonConfig, devConfig)