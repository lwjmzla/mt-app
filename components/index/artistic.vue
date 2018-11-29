<template>
  <section class="m-istyle">
    <dl @mouseover="over">
      <dt>有格调</dt>
      <dd
        :class="{active:kindAcitive==='all'}"
        kind="all"
        keyword="景点">全部</dd>
      <dd
        :class="{active:kindAcitive==='part'}"
        kind="part"
        keyword="美食">约会聚餐</dd>
      <dd
        :class="{active:kindAcitive==='spa'}"
        kind="spa"
        keyword="丽人">丽人SPA</dd>
      <dd
        :class="{active:kindAcitive==='movie'}"
        kind="movie"
        keyword="电影">电影演出</dd>
      <dd
        :class="{active:kindAcitive==='travel'}"
        kind="travel"
        keyword="旅游">品质出游</dd>
    </dl>
    <ul class="ibody" style="height:650px;">
      <li v-for="item in cur" :key="item.title">
        <el-card :body-style="{ padding: '0px' }" shadow="never">
          <img :src="item.img" class="image">
          <ul class="cbody">
            <li class="title">{{ item.title }}</li>
            <li class="pos"><span>{{ item.pos }}</span></li>
            <li class="price">￥<em>{{ item.price }}</em><span>/起</span></li>
          </ul>
        </el-card>
      </li>
    </ul>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data: () => {
    return {
      kind: 'all',
      kindAcitive: 'all',
      list: {
        all: [],
        part: [],
        spa: [],
        movie: [],
        travel: []
      },
      timer: null,
      loading: {}
    }
  },
  computed: {
    cur: function() {
      if (this.kind === 'all') {
        return this.all
      } else {
        return this.list[this.kind]
      }
    },
    ...mapGetters(['position', 'all'])
  },
  mounted() {},
  methods: {
    over: function(e) {
      // !当前效果完美 哈哈！！!
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
      this.timer = setTimeout(() => {
        let dom = e.target
        let tag = dom.tagName.toLowerCase()
        if (tag === 'dd') {
          const kind = dom.getAttribute('kind')
          this.kindAcitive = kind // 这个是控制active 三角图标
          if (this.list[kind].length || kind === 'all') {
            this.kind = kind
            return false
          }
          // !锁死某个kind加载，不让重复加载
          if (this.loading[kind]) {
            return false
          }
          this.loading[kind] = true

          const keyword = dom.getAttribute('keyword')
          this.$axios
            .get('/search/resultsByKeywords', {
              params: {
                keyword,
                city: this.position.city
              }
            })
            .then(res => {
              if (res.status === 200) {
                this.loading[kind] = false
                const data = res.data.pois.slice(0, 6)
                this.kind = kind // 在这里赋值 避免空白出现。更符合美团
                this.list[kind] = data.map(item => {
                  return {
                    title: item.name,
                    pos: item.type.split(';')[0],
                    price: item.biz_ext.cost || '暂无',
                    img: item.photos.length
                      ? item.photos[0].url
                      : 'http://store.is.autonavi.com/showpic/5795e1139719dba0bb3792cf0c81fb44',
                    url: '//abc.com'
                  }
                })
              }
            })
        }
      }, 50)
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/css/index/artistic.scss';
</style>
