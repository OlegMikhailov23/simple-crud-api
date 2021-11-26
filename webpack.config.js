const path = require('path');

const ENV = process.env.npm_lifecycle_event;
const isProd = ENV === 'build';

function setDMode() {
    if (isProd) {
        return 'production';
    } else {
        return 'development';
    }
}

const config = {
    mode: setDMode(),
    devtool: isProd ? false : 'source-map',
    entry: './server.js',
    target: 'node',
    optimization:{
        minimize: isProd ? true : false,
    },
    output: {
        clean: true,
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },

    plugins: [],
}

module.exports = config;
