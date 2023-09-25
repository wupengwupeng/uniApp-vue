import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue";
import './uni.promisify.adaptor'

Vue.config.productionTip = false

App.mpType = 'app'
Vue.use(uView);
Vue.component('mescroll-body', MescrollBody);
// 如此配置即可
uni.$u.config.unit = 'rpx'
const app = new Vue({
  ...App
})
app.$mount()
