<template>
  <router-view></router-view>

</template>

<script>
  // import {getAndStoreUserInfo} from '../api/auth.js'

  export default {
    name: 'app',
    components: {
    },
    data() {
      return {
      }
    },
    mounted() {

    },
    methods: {
      // 设置sharePage分享信息
      sharePage() {
        let params = {
          share: true, // true可以分享；false不可以分享
          data: {
            title: `春天再出发！立个flag，做好自己的事`, // 分享标题
            desc: '一步一个脚印，一棒接着一棒往前走', // 分享描述
            link: this.$store.state.shareUrl, // 分享链接
            imgUrl: 'http://pp-jgxzq.oss-cn-qingdao.aliyuncs.com/ctzcf/ctzcf_shortcut.jpg' // 分享图标
          }
        };
        this.$wxsdk.initConfig(params)
      },
      getUserInfoCache() {
        if (!this.$isEmpty(this.$webStorage.getItem('userInfo'))) {
          this.$store.commit('setUserInfo', JSON.parse(this.$webStorage.getItem('userInfo')))
        }
      }

    }

  }
</script>


<style lang="scss">

  /*body {*/
  /*background-color: #fbf9fe;*/
  /*}*/
</style>
