const { defineConfig } = require('@vue/cli-service')
// import glsl from "vite-plugin-glsl"
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8060,
    open: true, //项目启动时自动打开浏览器
  },
 
  configureWebpack:{
    // plugins: [glsl()],
    resolve: {
      fallback: { 
        path: require.resolve("path-browserify") ,
        fs:false
      },
    },
    module: {
      rules: [{
        test: /\.(frag|vert|glsl)$/,
        use: [
          { 
            loader: 'glsl-shader-loader',
            options: {}  
          }
        ]
      }]
    }
  }
})
