<template>
  <div class="common_main_container">
    <CommonHeader />
    <transition>
      <router-view></router-view>
    </transition>
    <div class="common_tabbar_wrapper">
      <ul>
        <li>
          <router-link :to="{name:'hitTheList'}">
            <div>
              <span></span>
              <label>打榜</label>
            </div>
          </router-link>
        </li>
        <li>
          <router-link :to="{name:'dream'}">
            <div>
              <span></span>
              <label>圆梦</label>
            </div>

          </router-link>
        </li>
        <li>
          <router-link :to="{name:'personalCenter'}">
            <div>
              <span></span>
              <label>我的</label>
            </div>

          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import CommonHeader from '@/components/common/CommonHeader';

import { Col, Dialog, Row, Icon, Form, Field, Button, Toast, NavBar, Cell, CellGroup, Step, Steps, RadioGroup, Radio, ActionSheet, DropdownMenu, DropdownItem, Notify, Popup } from 'vant';
import 'vant/lib/button/style';

export default {
  name: "Layout",
  components: {
    CommonHeader,
    Col, Dialog, Row, Icon, Form, Field, Button, Toast, NavBar, Cell, CellGroup, Step, Steps, RadioGroup, Radio, ActionSheet, DropdownMenu, DropdownItem, Notify, Popup
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
    this.$remResizing({
      baseline: 320,
      fontSize: 20,
      threshold: 640,

    })
    this.importVantComponents()
  },
  mounted() {
    this.$autoHeight({
      target: '.common_main_container',
      force: true
    });
    document.querySelector('.loading_container').style.display = 'none'
  },
  methods: {
    importVantComponents() {
      Vue.use(Col);
      Vue.use(Dialog);
      Vue.use(Row);
      Vue.use(Form);
      Vue.use(Icon);
      Vue.use(Field);
      Vue.use(Button);
      Vue.use(Toast);
      Vue.use(NavBar);
      Vue.use(Cell);
      Vue.use(CellGroup);
      Vue.use(Step);
      Vue.use(Steps);
      Vue.use(RadioGroup);
      Vue.use(Radio);
      Vue.use(ActionSheet);
      Vue.use(DropdownMenu);
      Vue.use(DropdownItem);
      Vue.use(Notify);
      Vue.use(Popup);


    },
  }
}
</script>
