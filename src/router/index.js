import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../Home.vue'
import InvoiceDetails from '../InvoiceDetails.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
      path: '/Invoice/:id',
      name:'InvoiceDetails',
      component: InvoiceDetails,
      props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
