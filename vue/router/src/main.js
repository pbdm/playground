import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import One from './One.vue'
import Two from './Two.vue'
import Three from './Three.vue'
import './hook.js'

Vue.config.productionTip = false
const router = new VueRouter({
  routes: [
  { name: '第一阶段', path: '/one', component: One },
  { name: '第二阶段', path: '/two', component: Two },
  { name: '第三阶段', path: '/three', component: Three },
  ] 
})

Vue.use(VueRouter)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
