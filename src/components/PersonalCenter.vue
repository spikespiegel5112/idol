<template>
  <div class="personalcenter_main_container">
    <div class='bg'>
      <!-- <div class="content"></div> -->
      <div class="circle"></div>
    </div>
    <div class="maincontent">
      <div class="userinfo">
        <div class="avatar">
          <img src="" alt="">
        </div>
        <div class="desc">
          <label class="name">dsaadsa</label>
        </div>
        <div class="operation">
          <router-link :to="{name:'editUserInfo'}">
            <van-icon name="edit" />
          </router-link>
        </div>
      </div>

    </div>
    <div class="details">
      <div class="">
        <van-cell-group>
          <van-cell title="单元格" value="内容" />
          <van-cell title="单元格" value="内容" label="描述信息" />
        </van-cell-group>
        <van-cell-group>
          <van-cell title="单元格" value="内容" />
        </van-cell-group>
        <van-cell-group>
          <van-cell title="单元格" value="内容" />
        </van-cell-group>
      </div>
      <div class="operation">
        <a class="" href="javascript:;"></a>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Entrance",
  components: {
  },
  data() {
    return {

    }

  },
  computed: {

  },
  watch: {


  },

  mounted() {


  },
  methods: {
    init() {

    },

  }
}
</script>

<style lang='scss'>
@import "@/sass/personalCenter.scss";
</style>
