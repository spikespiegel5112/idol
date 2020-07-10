

<template>
  <div class="common_header_wrapper">
    <div class="left_wrapper">
      <div class="previous">
        <van-button @click='goBack'>
          <van-icon name="arrow-left" />
        </van-button>
      </div>

    </div>
    <div class="middle_wrapper">标题</div>
    <div class="right_wrapper"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  // beforeCreate(){
  //   // alert('dsdsds')
  // },
  created() {

  },
  mounted() {
  
  },
  methods: {
  goBack(){
      this.$router.go(-1)
    }
  }
}
</script>
