import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

var router =  new Router({
  // mode: 'history',
  routes: [
    {
      path: '/addresslist',
      component: r => require.ensure([], () => r(require('@/components/addresslist'))),
      meta:{
        title:'我的地址'
      }
    },
    {
      path: '/addressedit',
      component: r => require.ensure([], () => r(require('@/components/addressedit'))),
      meta:{
        title:'新增地址'
      },
      beforeEnter: (to, from, next) => {
        if(to.query.name){
          document.title = '修改地址'
        }
        next();
      }
    },
    {
      path: '/dolllist',
      component: r => require.ensure([], () => r(require('@/components/dolllist'))),
      meta:{
        title:'我的娃娃'
      }
    },
    {
      path: '/exchangedolls',
      component: r => require.ensure([], () => r(require('@/components/exchangedolls'))),
      meta:{
        title:'确认订单'
      }
    },
    {
      path: '/orders',
      component: r => require.ensure([], () => r(require('@/components/orders')))
    },
    {
      path: '/ableexchangedolls',
      component: r => require.ensure([], () => r(require('@/components/ableexchangedolls')))
    },
    {
      path: '/addresslistmanage',
      component: r => require.ensure([], () => r(require('@/components/addresslistmanage'))),
      meta:{
        title:'我的地址'
      },
      beforeEnter: (to, from, next) => {
        if(to.query.form){
          document.title = '其他地址'
        }
        next();
      }
    },
    {
      path: '/order',
      component: r => require.ensure([], () => r(require('@/components/order'))),
      meta:{
        title:'我的订单'
      }
    },
    {
      path: '/gamehistory',
      component: r => require.ensure([], () => r(require('@/components/gamehistory'))),
      meta:{
        title:'游戏记录'
      }
    },
    {
      path: '/questions',
      component: r => require.ensure([], () => r(require('@/components/questions'))),
      meta:{
        title:'常见问题'
      }
    },
    {
      path:'/legacy',
      component: r => require.ensure([], () => r(require('@/components/legacy'))),
      meta:{
        title:'用户协议与隐私条款'
      }
    },
    {
      path:'/',
      redirect:'/dolllist'
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next()
})

export default router
