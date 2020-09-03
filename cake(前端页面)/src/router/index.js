import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'
import Home from "../views/Home.vue"
import cart from '../views/Cart.vue'
import bread from '../views/Bread.vue'
import classify from '../views/classify.vue'
import detail from '../views/detail.vue'
import identity from '../views/identity.vue'
import newpro from '../views/newpro.vue'
import more from '../views/more.vue'

Vue.use(VueRouter)

  const routes = [
    {
      path:'/',
      component:Home
    },
    {
      path:'/login',
      component:login
    },
    {
      path:'/cart',
      component:cart
    },
    {
      path:'/classify',
      component:classify
    },
    {
      path:'/bread',
      component:bread
    },
    {
      path:'/detail',
      component:detail
    },
    {
      path:'/identity',
      component:identity
    },
    {
      path:'/newpro',
      component:newpro
    },
    {
      path:'/more',
      component:more
    }
    // {
    //   path:'/header',
    //   component:Header
    // },
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
