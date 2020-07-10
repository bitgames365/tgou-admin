import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },

  {
    path: '/baseline',
    name: 'BaseLine',
    component: () => import(/* webpackChunkName: "tgbaselinecheck" */ '../views/TGBaseLineCheck.vue')
  },

  {
    path: '/configuration',
    name: 'ConfigurationVerification',
    component: () => import(/* webpackChunkName: "configurationverification" */ '../views/ConfigurationVerification.vue'),
    children: [
      {
        path: '/',
        name: 'CvDashBoard',
        component: () => import(/* webpackChunkName: "dashbord" */ '../views/ConfigurationVerificationPages/CvDashBoard.vue'),
      },
      {
        path: 'dashbord',
        name: 'CvDashBoard',
        component: () => import(/* webpackChunkName: "dashbord" */ '../views/ConfigurationVerificationPages/CvDashBoard.vue'),
      },
      {
        path: 'tasks',
        name: 'CvTasks',
        component: () => import(/* webpackChunkName: "dashbord" */ '../views/ConfigurationVerificationPages/CvTasks.vue'),
      },
      {
        path: 'devices',
        name: 'CvDevices',
        component: () => import(/* webpackChunkName: "dashbord" */ '../views/ConfigurationVerificationPages/CvDevices.vue'),
      },
      {
        path: 'reports',
        name: 'CvReports',
        component: () => import(/* webpackChunkName: "dashbord" */ '../views/ConfigurationVerificationPages/CvReports.vue'),
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
