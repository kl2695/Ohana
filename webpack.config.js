var path = require('path');
var webpack = require("webpack");

var plugins = []; // if using any plugins for both dev and production
var devPlugins = []; // if using any plugins for development

var prodPlugins = [
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: true
        }
    })
];

plugins = plugins.concat(
    process.env.NODE_ENV === 'production' ? prodPlugins : devPlugins
);

module.exports = {
    entry: './frontend/ohana.jsx',
    output: {
        filename: './app/assets/javascripts/bundle.js',
    },
    plugins: plugins,
    module: {
      
        loaders: [
            {
                test: [/\.jsx?$/],
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }, 
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            },
       
        ]
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '*']
    }
};