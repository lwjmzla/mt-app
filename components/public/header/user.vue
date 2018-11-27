<template>
  <div class="m-user">
    <template v-if="user">
      欢迎您，<span class="username">{{ user }}</span>
      <!-- <nuxt-link to="/exit">退出</nuxt-link> -->
      <!-- 用上面那个有何意义  有middleware属性-->
      <a href="javascript:void(0)" @click="logOut">[退出]</a>
    </template>
    <template v-else>
      <nuxt-link to="/login" class="login">立即登录</nuxt-link>
      <nuxt-link to="/register" class="register">注册</nuxt-link>
    </template>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: ''
    }
  },
  components: {

  },
  created() {
    // !请求的时候 在请求头 会把cookie传过去
    this.$axios.get('/users/getUser').then((res) => {
      const {status, data} = res
      if (status === 200 && data.code === 0) {
        // console.log(data)
        this.user = data.user
      } else if (data.code === -1) {
        this.$message({
          message: data.msg,
          type: 'warning'
        });
      }
    })
  },
  methods: {
    async logOut () {
      let { status, data } = await this.$axios.get('/users/exit')
      if (status === 200 && data && data.code === 0) {
        window.location.href = '/'
      }
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
