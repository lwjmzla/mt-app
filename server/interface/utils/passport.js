// import passport from 'koa-passport' // passport权限认证
// import LocalStrategy from 'passport-local'
// import UserModel from '../../dbs/models/users'
const passport = require('koa-passport')
const LocalStrategy = require('passport-local')
const UserModel = require('../../dbs/models/users')

// (登录策略)
passport.use(new LocalStrategy(async function (username, password, done) {
  let where = {
    username
  }
  let result = await UserModel.findOne(where)
  if (result !== null) {
    if (result.password === password) { // 查数据库的密码 跟 当前用户提交的密码 是否一致
      return done(null, result)
    } else {
      return done(null, false, '密码错误')
    }
  } else {
    return done(null, false, '用户名不存在')
  }
}))
// 序列化  session
passport.serializeUser(function (user, done) {
  done(null, user) // 这里应该是return 吧
})
// 反序列化
passport.deserializeUser(function (user, done) {
  return done(null, user)
})

module.exports = passport
