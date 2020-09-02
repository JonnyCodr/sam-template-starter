import { resolve } from 'path';
import { Configuration } from 'webpack';

const conf = {
    prodMode: process.env.NODE_ENV === 'production',
    pemplatePath: './template.yaml',
};

const config: Configuration = {
    entry: {
        defaultApiResponses: resolve(__dirname, 'src', 'defaultResponsees.ts'),
    },
    target: 'node',
    mode: conf.prodMode ? 'production' : 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'te-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        path: resolve(__dirname, 'dist'),
        filename: '[name].js',
        libraryTarget: 'commonjs2',
    },
    devtool: 'source-map',
    plugins: []
};

export default config;