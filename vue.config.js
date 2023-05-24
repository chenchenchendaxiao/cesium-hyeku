const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 80,
    open: true, //项目启动时自动打开浏览器
  },
})
