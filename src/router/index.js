import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import plane from '@/components/main'
import article from '@/components/article/article'
import save from '@/components/article/option/save'
import detail from '@/components/article/option/detail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/admin',
      name: 'login',
      component: login
    },
    {
      path: '/admin/main',
      name: 'main',
      component: plane,
      children: [
        {
          path: '/admin/main/article',
          component: article
        },
        {
          path: '/admin/main/article/save',
          component: save
        },
        {
          path: '/admin/main/article/detail',
          component: detail
        }
      ]
    }
  ]
})
