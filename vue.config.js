// vue.config.js 配置说明
//官方vue.config.js 参考文档 https://cli.vuejs.org/zh/config/#css-loaderoptions
// 这里只列一部分，具体配置参考文档
// const path = require("path")
// const zipPlugin = require('zip-webpack-plugin')
// const silly = require('silly-datetime')
const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

module.exports = {
  // 部署生产环境和开发环境下的URL。
  // 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上
  //例如 https://www.my-app.com/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 baseUrl 为 /my-app/。
  // baseUrl: process.env.NODE_ENV === "production" ? "./" : "/",

  // outputDir: 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）
  //用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
  // assetsDir: "assets",
  //指定生成的 index.html 的输出路径  (打包之后，改变系统默认的index.html的文件名)
  // indexPath: "myIndex.html",
  //默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变)
  // filenameHashing: false,

  //   lintOnSave：{ type:Boolean default:true } 问你是否使用eslint
  // lintOnSave: true,
  //如果你想要在生产构建时禁用 eslint-loader，你可以用如下配置
  // lintOnSave: process.env.NODE_ENV !== 'production',

  //是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。(默认false)
  // runtimeCompiler: false,


  productionSourceMap: false,
  // webpack插件
  configureWebpack: {
    plugins: [
      // new zipPlugin({
      //   path: path.join(__dirname, ''),
      //   pathPrefix: 'dist',
      //   filename: `cool_${silly.format(new Date(), 'YYYYMMDDHHmm')}.zip`
      // })
      // new PrerenderSPAPlugin({
      //   // 生成文件的路径，也可以与webpakc打包的一致。
      //   // 下面这句话非常重要！！！
      //   // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
      //   staticDir: path.join(__dirname, 'dist'),

      //   // 对应自己的路由文件，比如a有参数，就需要写成 /a/param1。
      //   routes: ['/', '/search'],
      //   // 这个很重要，如果没有配置这段，也不会进行预编译
      //   renderer: new Renderer({
      //     inject: {
      //       foo: 'bar'
      //     },
      //     headless: false,
      //     // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
      //     renderAfterDocumentEvent: 'render-event'
      //   })
      // })
      new CompressionPlugin()
    ]
  },
  // 它支持webPack-dev-server的所有选项
  devServer: {
    host: "localhost",
    // port: 8080, // 端口号
    https: false, // https:{type:Boolean}
    // open: true, //配置自动启动浏览器
    // 配置多个代理
    proxy: {
      "/douban/": {
        target: "https://movie.douban.com/",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '/douban': '' //需要rewrite的,
        }
      },
      "/j/*": {
        target: "https://m.douban.com/",
        ws: true,
        changeOrigin: true
      },
      "/rexxar/*": {
        target: "https://m.douban.com/",
        ws: true,
        changeOrigin: true
      },
      "/view/*": {
        target: "https://img3.doubanio.com/",
        ws: true,
        changeOrigin: true
      }
    }
  }
}