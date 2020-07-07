<template>
  <div class="common_main_container">
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue';
import { Loading, Toast, Icon } from 'vant';

export default {
  name: "Layout",
  components: {
    Loading
  },
  data() {
    return {

    }
  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  mounted() {
    this.$autoHeight({
      target: '.common_main_container',
      force: true
    });
    document.querySelector('.loading_container').style.display = 'none'
  },
  methods: {

  }
}
</script>

<style scoped>
</style>
