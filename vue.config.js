// -- 
const is_production = process.env.NODE_ENV !== 'development'
const add_uglifyjs_plugin = (config) => {
    const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
    config.plugins.push(
        new UglifyJsPlugin({
            uglifyOptions: {
                // -- 生产环境自动删除console
                compress: {
                    // warnings: false, // -- 若打包错误，则注释这行
                    drop_debugger: true,
                    drop_console: true,
                    pure_funcs: ['console.log']
                }
            },
            sourceMap: false,
            parallel: true
        })
    )
}
const add_compression_webpack_plugin = (config) =>{
    const CompressionWebpackPlugin = require('compression-webpack-plugin')
    config.plugins.push(
        new CompressionWebpackPlugin({
            // -- 匹配规则
            test:/\.js$|\.html$|.\css/,
            // -- 只有大小大于该值的资源会被处理 10kb
            threshold: 10240,
            // -- 压缩比例低于0.8才处理
            minRatio: 0.8,
            // -- 是否删除源文件
            deleteOriginalAssets: false,
        })
    )
}

module.exports = {
    publicPath: process.env.BASE_URL,
    outputDir: 'dist',
    assetsDir: './',
    productionSourceMap: false,
    filenameHashing: false,
    lintOnSave: true,
    devServer: {
        open: true,
        host: '0.0.0.0',
        port: 8000,
        https: false,
        hotOnly: false,
        proxy: process.env.VUE_APP_API
    },
    pwa:{
        iconPaths: {
            favicon32:'favicon.ico',
            favicon16:'favicon.ico',
            appleTouchIcon:'favicon.ico',
            maskIcon:'favicon.ico',
            msTileImage:'favicon.ico'
        }
    },
    configureWebpack: config => {
        if(is_production){
            add_uglifyjs_plugin(config)
            add_compression_webpack_plugin(config)
        }
    },
    chainWebpack: config => {
        // -- 压缩图片
        config.module
            .rule('images')
            .test(/\.(png|jpe?g|gif)(\?.*)?$/)
            .use('image-webpack-loader')
            .loader('image-webpack-loader')
            .options({ bypassOnDebug: true })
            .end()
    }
}