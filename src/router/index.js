import Vue from 'vue'
import Router from 'vue-router'
import UserList from '../components/user/UserList.vue'
import UserAdd from '../components/user/UserAdd.vue'
import UserDetail from '../components/user/UserDetail.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: UserList
    },
    {
      path: '/users',
      component: UserList
    },
    {
      path: '/user/add',
      component: UserAdd
    },
    {
      path: '/users/:seq',
      component: UserDetail
    }
  ]
})
