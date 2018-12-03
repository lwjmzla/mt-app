<template>
  <div class="search_panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <nuxt-link to="/"><img src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png" alt="美团"></nuxt-link>
      </el-col>
      <el-col :span="15" class="center">
        <div class="wrapper">
          <el-input placeholder="搜索商家或地点" v-model="searchVal" @focus="focus" @blur="blur" @input="input"></el-input>
          <button class="el-button el-button--primary"><i class="el-icon-search"></i></button>
          <dl class="hotPlace" v-show="isFocus && !searchVal">
            <dt>热门搜索</dt>
            <dd v-for="(item,index) in hotPlace" :key="index">
              <nuxt-link :to="`/products?keyword=${item.name}`" @click.native="refresh">{{item.name}}</nuxt-link>
            </dd>
          </dl>
          <dl class="searchList" v-show="isFocus && searchVal">
            <dd v-for="(item,index) in searchList" :key="index">
              <nuxt-link :to="`/products?keyword=${item.name}`" @click.native="refresh">{{item.name}}</nuxt-link>
            </dd>
          </dl>
        </div>
        <p class="suggest">
          <nuxt-link :to="`/products?keyword=${item.name}`" v-for="(item,index) in hotPlace" @click.native="refresh" :key="index">{{item.name}}</nuxt-link>
        </p>
        <ul class="nav">
          <li><nuxt-link to="/" class="takeout">美团外卖</nuxt-link></li>
          <li><nuxt-link to="/" class="movie">猫眼电影</nuxt-link></li>
          <li><nuxt-link to="/" class="hotel">美团酒店</nuxt-link></li>
          <li><nuxt-link to="/" class="apartment">民宿/公寓</nuxt-link></li>
          <li><nuxt-link to="/" class="business">商家入驻</nuxt-link></li>
        </ul>
      </el-col>
      <el-col :span="6" class="right">
        <ul class="security">
          <li><i class="refund"></i><p class="txt">随时退</p></li>
          <li><i class="single"></i><p class="txt">不满意面单</p></li>
          <li><i class="overdue"></i><p class="txt">过期退</p></li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      searchVal: '',
      isFocus: false,
      searchList: [],
      timer: null
    }
  },
  components: {},
  computed: {
    ...mapGetters(['position', 'hotPlace'])
  },
  mounted() {},
  methods: {
    focus() {
      this.isFocus = true
    },
    blur() {
      // 为了解决点击 热门搜素、搜索的item 时先触发了blur this.isFocus = false 的问题，而实际没点击上item 用延时
      setTimeout(() => {
        this.isFocus = false
      }, 100)
    },
    input() {
      if (!this.searchVal) {
        clearTimeout(this.timer)
        this.timer = null
        return false
      }
      this.searchList = []
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
      this.timer = setTimeout(() => {
        this.$axios
          .get('/search/top', {
            params: {
              input: this.searchVal,
              city: this._deleteLastWord(this.position.city)
            }
          })
          .then(res => {
            if (res.status === 200) {
              const searchList = res.data.top
              this.searchList = searchList.slice(0, 10)
            }
          })
      }, 200)
    },
    test() {
      console.log('test')
    },
    refresh() {
      if (window.location.pathname === '/products') {
        window.location.reload() // !this.$router.go(0) 都可以  后者不兼容siri 不知这样重新加载好不好，因为所有东西都是重新加载了
      }
    },
    _deleteLastWord(str) {
      return str.substring(0, str.length - 1)
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
