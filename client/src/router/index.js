import { route } from 'quasar/wrappers'
import { useUserStore } from 'src/stores/user'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */ {store}) {
  store.install
  const storeUser = useUserStore()
  console.log(storeUser.isAuthtenticated);

  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach((to,from, next)=>{
    // next()
    if(to.matched.some(route=>route.meta.requiredAuth)){
      if(!storeUser.isAuthtenticated){
        next('/login')
      }else {
        next()
      }
    } else {
      // console.log(to);
      if(to.name === 'Login' && storeUser.isAuthtenticated){
        next('/')
      } else {
        next()     
      }
    }
  })

  return Router
})
