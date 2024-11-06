const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  
  devServer: {
    proxy: {
      '/': {
        target: 'https://api-v2.deepsearch.com',
        changeOrigin: true,
        pathRewrite: {'^/': ''},
        ws: false
      }
    }
  }
})
