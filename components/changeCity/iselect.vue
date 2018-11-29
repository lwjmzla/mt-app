<template>
  <div class="m-select">
    <span class="name">按省份选择:</span>
    <el-select v-model="pvalue" placeholder="省份" no-data-text=" " @change="pchange">
      <el-option
        v-for="item in province"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-select v-model="cvalue" placeholder="城市" :disabled="!pvalue" no-data-text=" " @change="cchange">
      <el-option
        v-for="item in city"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入城市中文或英文"
      @select="handleSelect">
    </el-autocomplete>
  </div>
</template>

<script>
import pyjs from 'js-pinyin'
export default {
  data () {
    return {
      province: [],
      pvalue: '',
      city: [],
      cvalue: '',
      input: '',
      timer: null,
      cities: [] // 全国的
    }
  },
  components: {

  },
  created() {
    this.$axios.get('/geo/province').then((res) => {
      if (res.status === 200) {
        this.province = res.data.province.map((item) => {
          return {
            label: item.name,
            value: item.id
          }
        })
      }
    })
  },
  watch: {
    async pvalue (newVal) {
      this.$axios.get('/geo/province/'+newVal).then((res) => {
        const {status,data} = res
        if (status === 200) {
          this.city = data.city.map((item) => {
            return {
              label: item.name,
              value: item.id
            }
          })
        }
      })
    }
  },
  methods: {
    querySearchAsync (query, cb) {
      if (!this.cities.length) {
        this.$axios.get('/geo/city').then((res) => {
          const {status, data} = res
          if (status === 200) {
            this.cities = data.city.map((item) => {
              return {
                value: item.name,
                id: item.id
              }
            })
          }
        })
      }
      if (query === '') {
        const arr = []
        cb(arr) // 直接cb([])是不行的。。。
        return false
      }
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
      this.timer = setTimeout(() => {
        if (this.cities.length) {
          const matchCities = this.cities.filter((item) => {
            return item.value.indexOf(query) > -1 || pyjs.getFullChars(item.value).toLowerCase().indexOf(query.toLowerCase()) > -1
          })
          cb(matchCities)
        }
      }, 200)
    },
    handleSelect (obj) {
      console.log(obj.id)
    },
    cchange (val) {
      console.log(val)
    },
    pchange () {
      this.cvalue = ''
    }
  }
}
</script>

<style lang='scss'>
  @import "@/assets/css/changeCity/iselect.scss";
</style>
