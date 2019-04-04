import Vue from 'vue'
import Vuex from 'vuex'

import login from './login'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      login
    }
  })
   if (process.env.DEV && module.hot) {
    module.hot.accept(['./login'], () => {
      const newLogin = require('./login').default
      this.store.hotUpdate({ modules: { login: newLogin } })
    })
  }
  return Store
}
