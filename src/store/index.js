import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import userStore from "./userStore";

export default new Vuex.Store({
  modules: {
    user : userStore
  }
})
