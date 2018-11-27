<template>
  <div class="page-login">
    <div class="login-header">
      <a
        href="/"
        class="logo"/>
    </div>
    <div class="login-panel">
      <div class="banner">
        <img src="//s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/www.jpg" width="480" height="370" alt="美团网">
      </div>
      <div class="form">
        <h4 v-if="error" class="tips"><i/>{{ error }}</h4>
        <p><span>账号登录</span></p>
        <el-input v-model="username" prefix-icon="profile"/>
        <el-input v-model="password" prefix-icon="password" type="password"/>
        <div class="foot">
          <el-checkbox v-model="checked">7天内自动登录</el-checkbox>
          <b>忘记密码？</b>
        </div>
        <el-button class="btn-login" type="success" size="mini" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      checked: '',
      username: '',
      password: '',
      error: ''
    }
  },
  layout: 'blank',
  methods: {
    login: function () {
      this.$axios.post('/users/signin', {
        username: encodeURIComponent(this.username),
        password: this.password
        // password: CryptoJS.MD5(this.ruleForm.pwd).toString() // !加密用
      }).then((res) => {
        const {status, data} = res
        if (status === 200 && data.code === 0) {
          window.location.href = '/'
        } else if (data.code === -1) {
          this.$message({
            message: data.msg,
            type: 'warning'
          });
        }
      })
    }
  }
}
</script>

<style lang="scss">
    @import "@/assets/css/login/index.scss";
</style>
