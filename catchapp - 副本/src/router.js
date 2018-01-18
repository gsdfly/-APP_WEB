import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/addresslist',
      name:'addresslist',
      component: r => require.ensure([], () => r(require('@/components/addresslist')))
    },
    {
      path: '/addressedit',
      name:'addressedit',
      component: r => require.ensure([], () => r(require('@/components/addressedit')))
    },
    {
      path: '/dolllist',
      name:'dolllist',
      component: r => require.ensure([], () => r(require('@/components/dolllist')))
    },
    {
      path: '/exchangedolls',
      name:'exchangedolls',
      component: r => require.ensure([], () => r(require('@/components/exchangedolls')))
    },
    {
      path: '/orders',
      name:'orders',
      component: r => require.ensure([], () => r(require('@/components/orders')))
    },
    {
      path: '/ableexchangedolls',
      name:'ableexchangedolls',
      component: r => require.ensure([], () => r(require('@/components/ableexchangedolls')))
    },
    {
      path: '/addresslistmanage',
      name:'addresslistmanage',
      component: r => require.ensure([], () => r(require('@/components/addresslistmanage')))
    },
    {
      path:'/',
      redirect:'/dolllist'
    }
  ]
})
