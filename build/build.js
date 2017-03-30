// https://github.com/shelljs/shelljs
require('./check-versions')()
require('shelljs/global')
env.NODE_ENV = 'production'

var path = require('path')
var config = require('../config')
var ora = require('ora')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')

console.log(
  '  Tip:\n' +
  '  Built files are meant to be served over an HTTP server.\n' +
  '  Opening index.html over file:// won\'t work.\n'
)

var spinner = ora('building for production...')
spinner.start()

var assetsTmpPath = path.join(config.build.assetsRoot, config.build.assetsTmpDirectory)
rm('-rf', assetsTmpPath)
mkdir('-p', assetsTmpPath)
cp('-R', 'static/', assetsTmpPath)

webpack(webpackConfig, function (err, stats) {
  var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
  cp('-R', assetsTmpPath, assetsPath)

  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})
