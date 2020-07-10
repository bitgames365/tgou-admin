import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import echarts from 'echarts'
import {storePlugin} from './common/storeStorage';

Vue.use(storePlugin);
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
