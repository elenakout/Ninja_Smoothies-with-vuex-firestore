import Vue from 'vue'
import Vuex from 'vuex'
import smoothies from './modules/smoothies'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    smoothies   
  }
})