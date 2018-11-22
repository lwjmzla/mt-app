<template>
  <div class="search_panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <img src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png" alt="美团">
      </el-col>
      <el-col :span="15" class="center">
        <div class="wrapper">
          <el-input placeholder="搜索商家或地点" v-model="searchVal" @focus="focus" @blur="blur" @input="input"></el-input>
          <button class="el-button el-button--primary"><i class="el-icon-search"></i></button>
          <dl class="hotPlace" v-show="isFocus && !searchVal">
            <dt>热门搜索</dt>
            <dd v-for="(item,index) in hotPlace" @click="test" :key="index">{{item}}</dd>
          </dl>
          <dl class="searchList" v-show="isFocus && searchVal">
            <dd v-for="(item,index) in searchList" @click="test" :key="index">{{item}}</dd>
          </dl>
        </div>
        <p class="suggest">
          <a href="#">故宫博物院</a><a href="#">故宫博物院</a><a href="#">故宫博物院</a><a href="#">故宫博物院</a>
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
export default {
  data () {
    return {
      searchVal: '',
      isFocus: false,
      hotPlace: ['火锅','火锅','火锅','火锅','火锅'],
      searchList: ['火锅','火锅','火锅','火锅','火锅']
    }
  },
  components: {

  },
  mounted() {
  },
  methods: {
    focus () {
      this.isFocus = true
    },
    blur () {
      // 为了解决点击 热门搜素、搜索的item 时先触发了blur this.isFocus = false 的问题，而实际没点击上item 用延时
      setTimeout(() => {
        this.isFocus = false
      }, 100);
    },
    input () {
      console.log('input')
    },
    test () {
      console.log('test')
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
