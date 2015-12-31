var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');

var compiler = webpack({
    entry: {
        'main': './src/main.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
});

var server = new WebpackDevServer(compiler, {
    // webpack-dev-server options

    contentBase: 'http://localhost/',
    publicPath: '/dist/',

    quiet: false,
    lazy: false,

    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },

    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With'
    },
    
    stats: {
        colors: true
    }
});

server.listen(3000, 'localhost', function () {});
