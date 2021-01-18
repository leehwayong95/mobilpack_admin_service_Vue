import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/Login'
import sidebar from '@/components/side-bar'
import topbar from '@/components/topbar'
import AdminManagement from '@/components/Admin/AdminManagement'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/details',
      name: 'admin',
      components: {
        default: AdminManagement,
        top: topbar,
        left: sidebar
      }
    }
  ]
})
