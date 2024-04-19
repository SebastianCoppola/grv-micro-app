const { merge } = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
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
        publicPath: 'http://localhost:8070/'
    },
    devServer: {
        port: 8070,
        historyApiFallback: {
            index: '/index.html'
        },
        proxy: {
            '/api': {
                target: `${envDevelopment.API_SERVICIOS}${envDevelopment.API_PORT}`,
                changeOrigin: true,
                pathRewrite: { '^/api': '' },
            },
        },
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                login: 'login@http://localhost:8071/remoteEntry.js',
                contrataciones: 'contrataciones@http://localhost:8072/remoteEntry.js',
                callcenter: 'callcenter@http://localhost:8073/remoteEntry.js',
            },
            shared: packageJson.dependencies, 
        }),
    ]
};

module.exports = merge(commonConfig, devConfig)