import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/Login'
import sidebar from '@/components/side-bar'
import topbar from '@/components/topbar'
import AdminManagement from '@/components/Admin/Management'
import Notice from '@/components/Notice/Notice'
import Qna from '@/components/Qna/Qna'
import recommands from '@/components/Recommand/List'
import infoedit from '@/components/My/info'
import UserList from '@/components/User/List'

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
      path: '/main',
      name: 'admin',
      components: {
        top: topbar,
        left: sidebar
      }
    },
    {
      path: '/qna',
      name: 'Qna',
      components: {
        default: Qna,
        top: topbar,
        left: sidebar
      }
    },
    {
      path: '/notice',
      name: 'Notice',
      components: {
        default: Notice,
        top: topbar,
        left: sidebar
      }
    },
    {
      path: '/details',
      name: 'details',
      components: {
        default: AdminManagement,
        top: topbar,
        left: sidebar
      }
    },
    {
      path: '/recommands',
      name: 'recommands',
      components: {
        default: recommands,
        top: topbar,
        left: sidebar
      }
    },
    {
      path: '/user',
      name: 'userList',
      components: {
        default: UserList,
        top: topbar,
        left: sidebar
      }
    },
    {
      path: '/myinfo',
      name: 'myinfo',
      components: {
        default: infoedit,
        top: topbar,
        left: sidebar
      }
    }
  ]
})
