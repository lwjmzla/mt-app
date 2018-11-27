<template>
  <div class="m-menu" @mouseleave="mouseleave">
    <dl class="nav" >
      <dt>全部分类</dt>
      <dd v-for="(item,index) in menu" :key="index" @mouseenter="mouseenter(item.type)">
        <i :class="item.type"></i>{{item.name}}<span class="arrow"></span>
      </dd>
    </dl>
    <div class="detail" v-show="kind">
      <template v-for="(item,index) in curdetail">
        <h4 :key="index">{{item.title}}</h4>
        <span v-for="(subItem) in item.child" :key="subItem">{{subItem}}</span>
      </template>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      kind: '' // 类型
    }
  },
  computed: {
    ...mapGetters(['menu']),
    curdetail () {
      const kindDetail = this.menu.filter((item) => {
        return item.type === this.kind
      })
      if (kindDetail.length) {
        return kindDetail[0].child
      } else {
        return []
      }
    }
  },
  components: {
  },
  methods: {
    mouseleave () {
      setTimeout(() => {
        this.kind = ''
      }, 100);
    },
    mouseenter (kind) {
      this.kind = kind
    }
  }
}
</script>

<style lang='scss' scoped>
  .detail{
    h4{
      font-size: 16px;
      font-weight: 500;
      color: #222;
    }
  }
</style>
