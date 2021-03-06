/* eslint-disable */
const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
// ! 新写的
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const session = require('koa-generic-session')
const Redis = require('koa-redis')
const json = require('koa-json')
const dbConfig = require('./dbs/config')
const passport = require('./interface/utils/passport')
const users = require('./interface/users')
const geo = require('./interface/geo')
const search = require('./interface/search')
const categroy = require('./interface/categroy')
const cart = require('./interface/cart')
const order = require('./interface/order')

const app = new Koa()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

// ! 新写的
app.keys = ['mt', 'keyskeys']
app.proxy = true
app.use(session({key: 'mt', prefix: 'mt:uid', store: new Redis()}))
app.use(bodyParser({
  extendTypes:['json','form','text']
}))
app.use(json())

mongoose.connect(dbConfig.dbs,{
  useNewUrlParser:true
})
app.use(passport.initialize())
app.use(passport.session())

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  //装载所有子路由 // ! 新写的
  app.use(users.routes(),users.allowedMethods());
  app.use(geo.routes(),geo.allowedMethods());
  app.use(search.routes(),search.allowedMethods());
  app.use(categroy.routes(),categroy.allowedMethods());
  app.use(cart.routes(),cart.allowedMethods());
  app.use(order.routes(),order.allowedMethods());

  app.use(ctx => {
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset

    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject)
      })
    })
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
