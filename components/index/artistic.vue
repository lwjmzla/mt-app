<template>
  <section class="m-istyle">
    <dl @mouseover="over">
      <dt>有格调</dt>
      <dd
        :class="{active:kind==='all'}"
        kind="all"
        keyword="景点">全部</dd>
      <dd
        :class="{active:kind==='part'}"
        kind="part"
        keyword="美食">约会聚餐</dd>
      <dd
        :class="{active:kind==='spa'}"
        kind="spa"
        keyword="丽人">丽人SPA</dd>
      <dd
        :class="{active:kind==='movie'}"
        kind="movie"
        keyword="电影">电影演出</dd>
      <dd
        :class="{active:kind==='travel'}"
        kind="travel"
        keyword="旅游">品质出游</dd>
    </dl>
    <ul class="ibody">
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
export default {
  data: () => {
    return {
      kind: 'all',
      list: {
        all: [
          {
            title: '撒打算打算',
            pos: '撒打算打算',
            price: 100,
            img: '//p0.meituan.net/msmerchant/6275ca1bdb38862e15499e73a284487b460199.jpg@368w_208h_1e_1c',
            url: '#'
          },
          {
            title: '撒打算打算',
            pos: '撒打算打算',
            price: 100,
            img: '//p0.meituan.net/msmerchant/6275ca1bdb38862e15499e73a284487b460199.jpg@368w_208h_1e_1c',
            url: '#'
          },
          {
            title: '撒打算打算',
            pos: '撒打算打算',
            price: 100,
            img: '//p0.meituan.net/msmerchant/6275ca1bdb38862e15499e73a284487b460199.jpg@368w_208h_1e_1c',
            url: '#'
          },
          {
            title: '撒打算打算',
            pos: '撒打算打算',
            price: 100,
            img: '//p0.meituan.net/msmerchant/6275ca1bdb38862e15499e73a284487b460199.jpg@368w_208h_1e_1c',
            url: '#'
          },
          {
            title: '撒打算打算',
            pos: '撒打算打算',
            price: 100,
            img: '//p0.meituan.net/msmerchant/6275ca1bdb38862e15499e73a284487b460199.jpg@368w_208h_1e_1c',
            url: '#'
          },
          {
            title: '撒打算打算',
            pos: '撒打算打算',
            price: 100,
            img: '//p0.meituan.net/msmerchant/6275ca1bdb38862e15499e73a284487b460199.jpg@368w_208h_1e_1c',
            url: '#'
          }
        ],
        part: [
          {
            title: '爱我去二群无',
            pos: '轻微',
            price: 100,
            img: '//p1.meituan.net/merchantpic/910ff5d171dbf65452cc33fff6c86f86341227.jpg@240w_180h_1e_1c_1l|watermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20|368w_208h_1e_1c',
            url: '#'
          },
          {
            title: '爱我去二群无',
            pos: '轻微',
            price: 100,
            img: '//p1.meituan.net/merchantpic/910ff5d171dbf65452cc33fff6c86f86341227.jpg@240w_180h_1e_1c_1l|watermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20|368w_208h_1e_1c',
            url: '#'
          },
          {
            title: '爱我去二群无',
            pos: '轻微',
            price: 100,
            img: '//p1.meituan.net/merchantpic/910ff5d171dbf65452cc33fff6c86f86341227.jpg@240w_180h_1e_1c_1l|watermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20|368w_208h_1e_1c',
            url: '#'
          },
          {
            title: '爱我去二群无',
            pos: '轻微',
            price: 100,
            img: '//p1.meituan.net/merchantpic/910ff5d171dbf65452cc33fff6c86f86341227.jpg@240w_180h_1e_1c_1l|watermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20|368w_208h_1e_1c',
            url: '#'
          },
          {
            title: '爱我去二群无',
            pos: '轻微',
            price: 100,
            img: '//p1.meituan.net/merchantpic/910ff5d171dbf65452cc33fff6c86f86341227.jpg@240w_180h_1e_1c_1l|watermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20|368w_208h_1e_1c',
            url: '#'
          },
          {
            title: '爱我去二群无',
            pos: '轻微',
            price: 100,
            img: '//p1.meituan.net/merchantpic/910ff5d171dbf65452cc33fff6c86f86341227.jpg@240w_180h_1e_1c_1l|watermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20|368w_208h_1e_1c',
            url: '#'
          }
        ],
        spa: [
          {
            title: '撒打算打算',
            pos: '撒打算打算',
            price: 100,
            img: '//p0.meituan.net/msmerchant/6275ca1bdb38862e15499e73a284487b460199.jpg@368w_208h_1e_1c',
            url: '#'
          },
          {
            title: '撒打算打算',
            pos: '撒打算打算',
            price: 100,
            img: '//p0.meituan.net/msmerchant/6275ca1bdb38862e15499e73a284487b460199.jpg@368w_208h_1e_1c',
            url: '#'
          },
          {
            title: '撒打算打算',
            pos: '撒打算打算',
            price: 100,
            img: '//p0.meituan.net/msmerchant/6275ca1bdb38862e15499e73a284487b460199.jpg@368w_208h_1e_1c',
            url: '#'
          },
          {
            title: '撒打算打算',
            pos: '撒打算打算',
            price: 100,
            img: '//p0.meituan.net/msmerchant/6275ca1bdb38862e15499e73a284487b460199.jpg@368w_208h_1e_1c',
            url: '#'
          },
          {
            title: '撒打算打算',
            pos: '撒打算打算',
            price: 100,
            img: '//p0.meituan.net/msmerchant/6275ca1bdb38862e15499e73a284487b460199.jpg@368w_208h_1e_1c',
            url: '#'
          },
          {
            title: '撒打算打算',
            pos: '撒打算打算',
            price: 100,
            img: '//p0.meituan.net/msmerchant/6275ca1bdb38862e15499e73a284487b460199.jpg@368w_208h_1e_1c',
            url: '#'
          }
        ],
        movie: [
          {
            title: '爱我去二群无',
            pos: '轻微',
            price: 100,
            img: '//p1.meituan.net/merchantpic/910ff5d171dbf65452cc33fff6c86f86341227.jpg@240w_180h_1e_1c_1l|watermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20|368w_208h_1e_1c',
            url: '#'
          },
          {
            title: '爱我去二群无',
            pos: '轻微',
            price: 100,
            img: '//p1.meituan.net/merchantpic/910ff5d171dbf65452cc33fff6c86f86341227.jpg@240w_180h_1e_1c_1l|watermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20|368w_208h_1e_1c',
            url: '#'
          },
          {
            title: '爱我去二群无',
            pos: '轻微',
            price: 100,
            img: '//p1.meituan.net/merchantpic/910ff5d171dbf65452cc33fff6c86f86341227.jpg@240w_180h_1e_1c_1l|watermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20|368w_208h_1e_1c',
            url: '#'
          },
          {
            title: '爱我去二群无',
            pos: '轻微',
            price: 100,
            img: '//p1.meituan.net/merchantpic/910ff5d171dbf65452cc33fff6c86f86341227.jpg@240w_180h_1e_1c_1l|watermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20|368w_208h_1e_1c',
            url: '#'
          },
          {
            title: '爱我去二群无',
            pos: '轻微',
            price: 100,
            img: '//p1.meituan.net/merchantpic/910ff5d171dbf65452cc33fff6c86f86341227.jpg@240w_180h_1e_1c_1l|watermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20|368w_208h_1e_1c',
            url: '#'
          },
          {
            title: '爱我去二群无',
            pos: '轻微',
            price: 100,
            img: '//p1.meituan.net/merchantpic/910ff5d171dbf65452cc33fff6c86f86341227.jpg@240w_180h_1e_1c_1l|watermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20|368w_208h_1e_1c',
            url: '#'
          }
        ],
        travel: [
          {
            title: '撒打算打算',
            pos: '撒打算打算',
            price: 100,
            img: '//p0.meituan.net/msmerchant/6275ca1bdb38862e15499e73a284487b460199.jpg@368w_208h_1e_1c',
            url: '#'
          },
          {
            title: '撒打算打算',
            pos: '撒打算打算',
            price: 100,
            img: '//p0.meituan.net/msmerchant/6275ca1bdb38862e15499e73a284487b460199.jpg@368w_208h_1e_1c',
            url: '#'
          },
          {
            title: '撒打算打算',
            pos: '撒打算打算',
            price: 100,
            img: '//p0.meituan.net/msmerchant/6275ca1bdb38862e15499e73a284487b460199.jpg@368w_208h_1e_1c',
            url: '#'
          },
          {
            title: '撒打算打算',
            pos: '撒打算打算',
            price: 100,
            img: '//p0.meituan.net/msmerchant/6275ca1bdb38862e15499e73a284487b460199.jpg@368w_208h_1e_1c',
            url: '#'
          },
          {
            title: '撒打算打算',
            pos: '撒打算打算',
            price: 100,
            img: '//p0.meituan.net/msmerchant/6275ca1bdb38862e15499e73a284487b460199.jpg@368w_208h_1e_1c',
            url: '#'
          },
          {
            title: '撒打算打算',
            pos: '撒打算打算',
            price: 100,
            img: '//p0.meituan.net/msmerchant/6275ca1bdb38862e15499e73a284487b460199.jpg@368w_208h_1e_1c',
            url: '#'
          }
        ]
      }
    }
  },
  computed: {
    cur: function() {
      return this.list[this.kind]
    }
  },
  mounted() {
  },
  methods: {
    over: function(e) {
      let dom = e.target
      let tag = dom.tagName.toLowerCase()
      if (tag === 'dd') {
        this.kind = dom.getAttribute('kind')
      }
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/css/index/artistic.scss';
</style>
