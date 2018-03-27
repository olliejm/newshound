import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register.vue'
import Login from '@/components/Login.vue'
import PostList from '@/components/PostList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root'
    },
    {
      path: '/browse',
      name: 'browse',
      component: PostList
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
