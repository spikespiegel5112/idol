<template>
  <div class="entrance_loading_container">
    <div class="entrance_loading_wrapper">
      <div class="camera_wrapper" :class="{'active':currentLoadingPercentage!==100}">
        <div class="camera">
          <div class="icon">
            <img alt="" src="../image/entrance/loading.gif" />
          </div>
          <span v-if="currentLoadingPercentage!==100" class="percentage">{{currentLoadingPercentage}}%</span>
          <!--{{currentLoadingPercentage}}-->
          <span v-else class="percentage">点击</span>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>


export default {
  name: "Loading",
  components: {
  },
  data() {
    return {


    }
  },
  computed: {
    openEntrance() {
      return this.$store.state.openEntrance;
    },
    readyFlag() {
      return this.$store.state.openEntrance && this.bgmReadyFlag;
    },


    currentLoadingPercentage() {
      let resuult = 0
      const checkList = ['/', '/entrance']
      if (checkList.find(item => item === this.$route.path)) {
        resuult = this.$store.state.currentLoadingPercentage
      } else {
        resuult = 100
      }
      return this.$store.state.currentLoadingPercentage
    },

  },
  watch: {

  },
  created() {


    document.querySelector('.loading_container').style.display = 'none'

    console.log('$webStorage:', this.$webStorage.type);
  },
  mounted() {
    this.$autoHeight({
      target: '.common_main_container',
    });
    this.init();
  },
  methods: {
    init() {
      
      // debugger
      this.$router.push({
        name: 'entrance'
      })
    },
  }
}
</script>

<style scoped>
</style>
