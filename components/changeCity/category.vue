<template>
  <div>
    <dl class="m-categroy">
      <dt>按拼音首字母选择：</dt>
      <dd v-for="item in showList" :key="item"><a :href="'#city-'+item">{{ item }}</a></dd>
    </dl>
    <dl v-for="item in block" :key="item.title" class="m-categroy-section">
      <dt :id="'city-'+item.title">{{item.title}}</dt>
      <dd>
        <span v-for="c in item.city" :key="c">{{c}}</span>
      </dd>
    </dl>
  </div>
</template>

<script>
import pyjs from 'js-pinyin'
export default {
  data () {
    return {
      list: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
      showList: [], // 这才是要展示的字母
      block: []
    }
  },
  components: {

  },
  created () {
    // 先建一个模型
    let arrModel = this.list.map((item) => {
      return {
        title: item,
        city: []
      }
    })
    this.$axios.get('/geo/city').then((res) => {
      const {status, data} = res
      if (status === 200) {
        const city = data.city // 所有城市
        city.forEach((item) => {
          const cityName = item.name
          const firstLetter = pyjs.getFullChars(item.name).charAt(0)
          for (let i = 0;i < arrModel.length;i++) {
            if (arrModel[i].title === firstLetter) {
              arrModel[i].city.push(cityName)
              break // forEach不好跳出循环
            }
          }
        })
        this.block = arrModel.filter((item) => {
          if (item.city.length) {
            this.showList.push(item.title)
          }
          return item.city.length // 将数组存在的才展示
        })
      }
    })
  }
}
</script>

<style lang='scss'>
  @import "@/assets/css/changeCity/categroy.scss";
</style>
