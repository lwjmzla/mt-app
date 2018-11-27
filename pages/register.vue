<template>
  <div class="page-register">
    <article class="header">
      <header>
        <a href="/" class="site-logo" />
        <span class="login">
          <em class="bold">已有美团账号？</em>
          <a href="/login">
            <el-button type="primary" size="small">登录</el-button>
          </a>
        </span>
      </header>
    </article>
    <section>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="昵称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
          <el-button size="mini" @click="sendMsg">发送验证码</el-button>
          <span class="status">{{statusMsg}}</span>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="ruleForm.code" maxlength="4"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="ruleForm.pwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="cpwd">
          <el-input v-model="ruleForm.cpwd" type="password"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="register">同意以下协议并注册</el-button>
          <div class="error">{{error}}</div>
        </el-form-item>
        <el-form-item >
          <a class="f1" href="http://www.meituan.com/about/terms" target="_blank">《美团网用户协议》</a>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import {IsCorrectPwd} from '@/assets/js/utils.js'
// import CryptoJS from 'crypto-js'
export default {
  layout: 'blank', // !设置模板  头部底部那些，默认是default.vue
  data () {
    return {
      statusMsg: '',
      error: '',
      timer: null,
      ruleForm: {
        name: '',
        code: '',
        pwd: '',
        cpwd: '',
        email: ''
      },
      validateState: {
        namePass: false,
        codePass: false,
        pwdPass: false,
        cpwdPass: false,
        emailPass: false
      },
      rules: {
        name: [{
          required: true, type: 'string', message: '请输入昵称', trigger: 'blur'
        }],
        email: [{
          required: true, type: 'email', message: '请输入邮箱', trigger: 'blur'
        }],
        code: [{
          required: true, type: 'string', message: '请输入验证码', trigger: 'blur'
        }],
        pwd: [{
          required: true, message: '请输入6-16位，包含数字和字母', trigger: 'blur'
        }, {
          validator: (rule, value, callback) => {
            if (this.ruleForm.cpwd) { // 确认密码存在的话，再检测一次
              this.$refs['ruleForm'].validateField('cpwd', (errTips) => {})
            }
            if (!IsCorrectPwd(value)) {
              callback(new Error('请输入6-16位，包含数字和字母'))
            } else {
              callback()
            }
          }, trigger: 'blur'
        }],
        cpwd: [{
          required: true, message: '确认密码', trigger: 'blur'
        }, {
          validator: (rule, value, callback) => { // !这里的验证其实 比较随意 还要验证pwd 这里只是举出了自定义验证的方法
            if (value === '') {
              callback(new Error('请再次输入密码'))
            } else if (value !== this.ruleForm.pwd) {
              callback(new Error('两次输入密码不一致'))
            } else {
              callback()
            }
          }, trigger: 'blur'
        }]
      }
    }
  },
  components: {

  },
  methods: {
    sendMsg () {
      if (this.timer) {
        return false
      }
      // 先验证 昵称 和 邮箱
      this._checkFirstTwo()
      if (this.validateState.namePass && this.validateState.emailPass) {
        this.$axios.post('/users/verify', {
          username: encodeURIComponent(this.ruleForm.name),
          email: this.ruleForm.email
        }).then((res) => {
          const {status, data} = res
          if (status === 200 && data.code === 0) {
            let count = 60
            this.statusMsg = `验证码已发送，剩余${count}秒`
            this.timer = setInterval(() => {
              count--
              this.statusMsg = `验证码已发送，剩余${count}秒`
              if (count === 0) {
                clearInterval(this.timer)
                this.timer = null
                this.statusMsg = `验证码已发送`
              }
            }, 1000)
          } else if (data.code === -1) {
            this.$message({
              message: data.msg,
              type: 'warning'
            });
          }
        })
      }
    },
    register () {
      this._checkFirstTwo()
      this._checkLastThree()
      const {namePass, codePass, pwdPass, cpwdPass, emailPass} = this.validateState
      if (namePass && codePass && pwdPass && cpwdPass && emailPass) {
        this.$axios.post('/users/signup', {
          username: encodeURIComponent(this.ruleForm.name),
          email: this.ruleForm.email,
          code: this.ruleForm.code,
          password: this.ruleForm.pwd
          // password: CryptoJS.MD5(this.ruleForm.pwd).toString() // !加密用
        }).then((res) => {
          const {status, data} = res
          if (status === 200 && data.code === 0) {
            window.location.href = '/login'
          } else if (data.code === -1) {
            this.$message({
              message: data.msg,
              type: 'warning'
            });
          }
        })
      }
    },
    _checkFirstTwo () {
      this.$refs['ruleForm'].validateField('name', (errTips) => {
        this.validateState.namePass = errTips ? false : true
      })
      this.$refs['ruleForm'].validateField('email', (errTips) => {
        this.validateState.emailPass = errTips ? false : true
      })
    },
    _checkLastThree () {
      this.$refs['ruleForm'].validateField('code', (errTips) => {
        this.validateState.codePass = errTips ? false : true
      })
      this.$refs['ruleForm'].validateField('pwd', (errTips) => {
        this.validateState.pwdPass = errTips ? false : true
      })
      this.$refs['ruleForm'].validateField('cpwd', (errTips) => {
        this.validateState.cpwdPass = errTips ? false : true
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import "@/assets/css/register/index.scss";
</style>
