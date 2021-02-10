import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/doors',
    name: 'Doors',
    component: () => import('../views/DoorsOverview.vue')
  },
  {
    path: '/widgets',
    name: 'Widgets',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/WidgetsOverview.vue')
  },
  {
    path: '/doors/:id',
    name: 'DoorDetail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/DoorDetails.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
