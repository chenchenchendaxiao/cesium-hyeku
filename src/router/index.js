import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import webGlIndex from '@/components/Webgl/webglIndex.vue'
import CesiumIndex from '@/components/Cesium/CesiumPageInex.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AboutView
  },
  {
    path: '/webgl',
    name: 'webgl',
    component: webGlIndex
  },
  {
    path: '/cesiumPage',
    name: 'cesiumPage',
    component: CesiumIndex
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
