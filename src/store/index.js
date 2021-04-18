import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    timeData: [],
    nextTimeDataId: 0,
    clientData: [],
    currentClientId: -1,
    nextClientId: 0,
    year: 2021,
    month: 1,
  },
  getters: {
    getYear(state) {
      return state.year
    },
    getMonth(state) {
      return state.month
    },
    getNextTimeDataId(state) {
      return state.nextTimeDataId
    },
    getClientData(state) {
      return state.clientData
    },
    getCurrentClientId(state) {
      return state.currentClientId
    },
    getCurrentClientData(state) {
      const index = state.clientData.findIndex((data) => data.id === state.currentClientId)
      return state.clientData[index]
    }
  },
  mutations: {

  },
  actions: {

  },
  modules: {
  }
})
