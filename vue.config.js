const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  base: '/fake-os-first-vue-app/',
  transpileDependencies: true,
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {'^/api': '/'},
      }
    }
  }
})
