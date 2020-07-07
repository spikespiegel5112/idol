<template>
  <div class="entrance_main_container">
    <transition name="fade" :appear="true" :leave="true">
      <div class="entrance_animation_container" :style="animationStyle">
        <canvas id="prologue" :width="canvasWidth" :height="canvasHeight">
          您的浏览器不支持canvas
        </canvas>
      </div>
    </transition>

    <div v-if="false" class="entrance_speech_wrapper">
      <ul class="speech">
        <li v-for="(item, index) in speechList" :key='index' :class="{active:item.active,}">
          <img alt="" :src="item.image" />
        </li>
      </ul>
    </div>
    <transition name="fade" :appear="true" :leave="true">
      <div v-show="!loadingDataFlag&&!beginFlag" class="title">
        <img alt="" src="../image/entrance/yinianzhijizaiyuchun_00000.png" />
      </div>
    </transition>

    <div class="entrance_button_wrapper">
      <transition name="fade" :appear="true" :leave="true">
        <a v-show="!loadingDataFlag&&!beginFlag" :class="{active:beginFlag}" @click="playAnimation"
          class="entrance_beginbutton"></a>
      </transition>
    </div>
    <transition name="fade" :appear="true" :leave="true">
      <div v-show="!loadingDataFlag&&!beginFlag" class="common_logo_wrapper">
        <span class="common_logo_item"></span>
      </div>
    </transition>

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

<style scoped>
</style>
