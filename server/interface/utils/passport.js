import passport from 'koa-passport'
import LocalStrategy from 'passport-local'
import UserModel from '../../dbs/models/users'

passport.use(new LocalStrategy(async function (username, passport, done) {
  let where = {
    username
  }
  let result = await UserModel.findOne(where)
  if (result !== null) {
    if (result.passport === passport) {
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

export default passport
