import Vue from 'vue'
import Router from 'vue-router'

//组件模块
import AppIndex from './components/home/AppIndex'
import Login from './components/Login'
import Home from './components/Home'
import LibraryIndex from "@/components/library/LibraryIndex";
import Register from "@/components/Register";
Vue.use(Router)

// todo 不知道什么意思，为了解决路由跳转到后台报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  mode: 'history',
    routes: [
      {
        path: '/',
        name: 'Default',
        redirect: '/index',
        component: AppIndex
      },
      {
        path: '/login', name: 'Login', component: Login
      },
      {
        path: '/register', name: 'Register', component: Register
      },
      {
        path: '/home', name: 'Home', component: Home,
        children: [
          {
            path: '/index',
            name: 'AppIndex',
            component: AppIndex
          },
          {
            path: '/library',
            name: 'Library',
            component: LibraryIndex
          },
          {
            path: '/article',
            name: 'Article',
            component: () => import('./components/article/Articles')
          },
          {
            path: '/article/articles',
            name: 'Article',
            component: () => import('./components/article/ArticleDetails')
          },
        ]
      },
      {
        path: '/admin',
        name: 'AdminIndex',
        // redirect: '/admin/roleConfig',
        component: () => import('./components/admin/AdminIndex'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/admin/content/editor',
        name: 'ArticleEditor',
        // redirect: '/admin/roleConfig',
        component: () => import('./components/admin/content/ArticleEditor'),
        meta: {
          requireAuth: true
        }
      }
      // {
      //   path: '/admin',
      //   name: 'AdminIndex',
      //   // redirect: '/admin/roleConfig',
      //   component: ()=> import('./components/admin/AdminIndex'),
      //   meta: {
      //     requireAuth: true
      //   },
      //   children: [
      //     {
      //       path: '/admin/roleConfig',
      //       name: 'RoleConfig',
      //       component: () => import('./components/admin/user/RoleConfig'),
      //       meta: {
      //         requireAuth: true
      //       },
      //     },
      //     {
      //       path: '/admin/surplus',
      //       name: 'Surplus',
      //       component: () => import('./components/admin/search/Surplus'),
      //       meta: {
      //         requireAuth: true
      //       },
      //     }
      //   ]
      // }
    ]
})
