import Router from 'koa-router'
import Redis from 'koa-redis'
import nodeMailer from 'nodemailer'
import User from '../dbs/models/users'
import passport from './utils/passport'
import axios from './utils/axios'
import Email from '../dbs/models/config'

let router = new Router({
  prefix: '/users'
})

let store = new Redis().client

router.post('/signup', async (ctx) => {
  const { username, passport, email, code } = ctx.request.body
})
