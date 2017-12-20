import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/place',
      component: index
    },
    {
      path: '/place1',
      component: r => require.ensure([], () => r(require('@/components/place1')))
    },
    {
      path: '/place2',
      component: r => require.ensure([], () => r(require('@/components/place2')))
    },
    {
      path: '/404',
      component: r => require.ensure([], () => r(require('@/components/notcomponent')))
    },
    {
      path:'/',
      redirect:'/place'
    }
  ]
})
