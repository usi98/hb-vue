import Vue from 'vue'
import Router from 'vue-router'

//组件模块
import AppIndex from './components/home/AppIndex'
import Login from './components/Login'
import Home from './components/Home'
import LibraryIndex from "@/components/library/LibraryIndex";

Vue.use(Router)

export default new Router({
  mode: 'history',
    routes: [
      {
        path: '/login', name: 'Login', component: Login
      },
      {
        path: '/home', name: 'Home', component: Home,
        children: [
          {
            path: '/index',
            name: 'AppIndex',
            component: AppIndex,
            meta: {
              requireAuth: true
            }
          },
          {
            path: '/library',
            name: 'Library',
            component: LibraryIndex,
            meta: {
              requireAuth: true
            }
          }
        ]
      }
    ]
})
