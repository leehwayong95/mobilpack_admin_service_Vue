import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/Login'
import sidebar from '@/components/side-bar'
import topbar from '@/components/topbar'
import AdminManagement from '@/components/Admin/Management'
import Notice from '@/components/Notice/Notice'
import Qna from '@/components/Qna/List'
import QnaDetail from '@/components/Qna/Detail'
import recommands from '@/components/Recommand/List'
import infoedit from '@/components/My/info'
import UserList from '@/components/User/List'
import AdminDetails from '@/components/Admin/Details'
import AdminEdit from '@/components/Admin/Edit'
import AdminRegistration from '@/components/Admin/Registration'
import UserDetail from '@/components/User/Detail'
import NoticeEdit from '@/components/Notice/Edit'
import NoticeRegistration from '@/components/Notice/Registration'
import NoticeDetails from '@/components/Notice/Details'
import Pop from '@/components/Recommand/Popup'
import test from '@/components/Recommand/test'
import RecommandDetails from '@/components/Recommand/Details'
import RecommandRegistrtion from '@/components/Recommand/Registration'
import RecommandEdit from '@/components/Recommand/Edit'

import VueCookie from 'vue-cookie'
import axios from 'axios'

Vue.use(Router)

const router = new Router({
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
      },
      beforeEnter: (to, from, next) => {
        checklogin(to, from, next)
      }
    },
    {
      path: '/qna',
      name: 'Qna',
      components: {
        default: Qna,
        top: topbar,
        left: sidebar
      },
      beforeEnter: (to, from, next) => {
        checklogin(to, from, next)
      }
    },
    {
      path: '/qna/:index',
      name: 'QnaDetail',
      components: {
        default: QnaDetail,
        top: topbar,
        left: sidebar
      },
      beforeEnter: (to, from, next) => {
        checklogin(to, from, next)
      }
    },
    {
      path: '/notice',
      name: 'Notice',
      components: {
        default: Notice,
        top: topbar,
        left: sidebar
      },
      beforeEnter: (to, from, next) => {
        checklogin(to, from, next)
      }
    },
    {
      path: '/details',
      name: 'details',
      components: {
        default: AdminManagement,
        top: topbar,
        left: sidebar
      },
      beforeEnter: (to, from, next) => {
        checklogin(to, from, next)
      }
    },
    {
      path: '/admindetails',
      name: 'admindetails',
      components: {
        default: AdminDetails,
        top: topbar,
        left: sidebar
      },
      beforeEnter: (to, from, next) => {
        checklogin(to, from, next)
      }
    },
    {
      path: '/adminregistration',
      name: 'adminregistration',
      components: {
        default: AdminRegistration,
        top: topbar,
        left: sidebar
      },
      beforeEnter: (to, from, next) => {
        checklogin(to, from, next)
      }
    },
    {
      path: '/adminedit',
      name: 'adminedit',
      components: {
        default: AdminEdit,
        top: topbar,
        left: sidebar
      },
      beforeEnter: (to, from, next) => {
        checklogin(to, from, next)
      }
    },
    {
      path: '/recommands',
      name: 'recommands',
      components: {
        default: recommands,
        top: topbar,
        left: sidebar
      },
      beforeEnter: (to, from, next) => {
        checklogin(to, from, next)
      }
    },
    {
      path: '/recommandsdetails',
      name: 'recommandsdetails',
      components: {
        default: RecommandDetails,
        top: topbar,
        left: sidebar
      },
      beforeEnter: (to, from, next) => {
        checklogin(to, from, next)
      }
    },
    {
      path: '/recommandregistrtion',
      name: 'recommandregistrtion',
      components: {
        default: RecommandRegistrtion,
        top: topbar,
        left: sidebar
      },
      beforeEnter: (to, from, next) => {
        checklogin(to, from, next)
      }
    },
    {
      path: '/user',
      name: 'userList',
      components: {
        default: UserList,
        top: topbar,
        left: sidebar
      },
      beforeEnter: (to, from, next) => {
        checklogin(to, from, next)
      }
    },
    {
      path: '/user/:id',
      name: 'userDetail',
      components: {
        default: UserDetail,
        top: topbar,
        left: sidebar
      },
      beforeEnter: (to, from, next) => {
        checklogin(to, from, next)
      }
    },
    {
      path: '/myinfo',
      name: 'myinfo',
      components: {
        default: infoedit,
        top: topbar,
        left: sidebar
      },
      beforeEnter: (to, from, next) => {
        checklogin(to, from, next)
      }
    },
    {
      path: '/noticedit',
      name: 'noticeedit',
      components: {
        default: NoticeEdit,
        top: topbar,
        left: sidebar
      },
      beforeEnter: (to, from, next) => {
        checklogin(to, from, next)
      }
    },
    {
      path: '/noticeregistration',
      name: 'noticeregistration',
      components: {
        default: NoticeRegistration,
        top: topbar,
        left: sidebar
      },
      beforeEnter: (to, from, next) => {
        checklogin(to, from, next)
      }
    },
    {
      path: '/noticedetails',
      name: 'noticedetails',
      components: {
        default: NoticeDetails,
        top: topbar,
        left: sidebar
      },
      beforeEnter: (to, from, next) => {
        checklogin(to, from, next)
      }
    },
    {
      path: '/pop',
      name: 'pop',
      component: Pop
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/recommandEdit',
      name: 'recommandEdit',
      component: RecommandEdit
    }
  ]
})

function checklogin (to, from, next) {
  let token = VueCookie.get('authorization')
  if (token === '' || token === null) {
    alert('로그인이 필요한 기능입니다.')
    next('/')
  } else {
    axios.defaults.headers.common['authorization'] = token
    next()
  }
}

export default router
