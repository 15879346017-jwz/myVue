import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isShows:0,
    id:1,
    sum:0
  },
  mutations: {
    changeState0(state){
      state.isShows=0;
    },
    changeState1(state){
      state.isShows=1;
    },
    changeState2(state){
      state.isShows=2;
    },
    changeState3(state){
      state.isShows=3;
    },
    changeState4(state){
      state.isShows=4;
    },
    changeState5(state){
      state.isShows=5;
    },
    changeState6(state){
      state.isShows=6;
    },
    changeState7(state){
      state.isShows=7;
    }
  },
  actions: {
  },
  modules: {
  }
})
