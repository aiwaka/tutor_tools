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
    myData: {},
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
    filteredTimeData(state) {
      return state.timeData.filter(data => {
        return data.date.month === state.month && data.date.year === state.year && data.client === state.currentClientId
      })
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
    },
    getMyData(state) {
      return state.myData
    }
  },
  mutations: {

  },
  actions: {
    /* カレンダーデータ関連 */
    setDateAndSave({state}, {month, year}) {
      // 現在開いている年月を変更し, ストレージに保存する.
      // setするメソッドをcommitしyearとmonthを変更
      state.month = month
      state.year = year
      localStorage.setItem('month', JSON.stringify(month))
      localStorage.setItem('year', JSON.stringify(year))
    },
    loadDate({state}){
      // 年月をロードする. 見つからなければ現在をセット
      const nowdate = new Date(Date.now())
      const monthData = localStorage.getItem('month')
      if (monthData) {
        state.month = JSON.parse(monthData)
      } else {
        state.month = nowdate.getMonth() + 1
      }
      const yearData = localStorage.getItem('year')
      if (yearData) {
        state.year = JSON.parse(yearData)
      } else {
        state.year = nowdate.getFullYear()
      }
    },
    /* タイマーデータ関連 */
    clearTimeData({state}) {
      // 保存されている時間データを削除する.
      if (localStorage.getItem('timeData')){
        state.timeData.splice(0, state.timeData.length)
        localStorage.removeItem('timeData')
      } else {
        alert('保存されたデータがありません')
      }
      state.nextTimeDataId = 0
      localStorage.removeItem('nextTimeDataId')
    },
    saveTimeData({state}, payload) {
      // 時間データをstateとstorageに保存する. 保存する際idと現在クライアントを追加
      state.timeData.push(Object.assign({
        id: state.nextTimeDataId,
        client: state.currentClientId
      }, payload))
      const parsedData = JSON.stringify(state.timeData)
      localStorage.setItem('timeData', parsedData)
      // idを増やしてそれも保存する
      state.nextTimeDataId += 1
      localStorage.setItem('nextTimeDataId', JSON.stringify(state.nextTimeDataId))
    },
    loadTimeData({state}) {
      // 時間データをロードする.
      const timeData = localStorage.getItem('timeData')
      if (timeData) {
        state.timeData = JSON.parse(timeData)
        state.nextTimeDataId = JSON.parse(localStorage.getItem('nextTimeDataId'))
      } else {
        state.timeData = []
        state.nextTimeDataId = 0
      }
    },
    deleteTimeDataById({state}, {id}) {
      // 指定されたidのデータを消去する. idを振り直しはしない.
      const index = state.timeData.findIndex((data) => data.id === id)
      if (index === -1) {
        alert('[delete time-data] index error')
        return
      }
      state.timeData.splice(index, 1) // spliceで消去しないとvueのシステムは反応しない
      const parsedData = JSON.stringify(state.timeData)
      localStorage.setItem('timeData', parsedData)
    },
    /* 顧客データ関連 */
    saveClientData({state}, payload) {
      // 顧客データをstateとstorageに保存する.
      state.clientData.push(Object.assign({id: state.nextClientId}, payload))
      const parsedData = JSON.stringify(state.clientData)
      localStorage.setItem('clientData', parsedData)
      // idを増やしてそれも保存する
      state.nextClientId += 1
      localStorage.setItem('nextClientId', JSON.stringify(state.nextClientId))
    },
    loadClientData({state}) {
      // 顧客データをロードする.
      const clientData = localStorage.getItem('clientData')
      if (clientData) {
        state.clientData = JSON.parse(clientData)
        state.nextClientId = JSON.parse(localStorage.getItem('nextClientId'))
        state.currentClientId = JSON.parse(localStorage.getItem('currentClientId'))
      } else {
        state.clientData = []
        state.nextClientId = 0
        state.currentClientId = -1
      }
    },
    deleteClientDataById ({state}, {id}) {
      // 指定されたidのデータを消去する. idを振り直しはしない.
      const index = state.clientData.findIndex((data) => data.id === id)
      if (index === -1) {
        alert('[delete client-data] index error')
        return
      }
      state.clientData.splice(index, 1)
      const parsedData = JSON.stringify(state.clientData)
      localStorage.setItem('clientData', parsedData)
      // 消した場合セットしていない状態に変更する.
      state.currentClientId = -1
      localStorage.setItem('currentClientId', JSON.stringify(state.currentClientId))
    },
    modifyClientData({state}, payload) {
      // payloadで更新内容をオブジェクトで受け取る. 含まれるidのものを探して更新する.
      const index = state.clientData.findIndex((data) => data.id === payload.id)
      if (index === -1) {
        alert('[change client-data] index error')
        return
      }
      Object.assign(state.clientData[index], payload)
      // ストレージにセーブ
      const parsedData = JSON.stringify(state.clientData)
      localStorage.setItem('clientData', parsedData)
    },
    setCurrentClient({state}, {id}) {
      state.currentClientId = id
      localStorage.setItem('currentClientId', JSON.stringify(state.currentClientId))
    },
    /* 自分のデータ */
    loadMyData({state}) {
      const myData = localStorage.getItem('myData')
      if (myData) {
        state.myData = JSON.parse(myData)
      } else {
        Object.assign(state.myData, {
          name: '',
          email: '',
        })
      }
    },
    saveMyData({state}, payload) {
      // payloadで更新内容をオブジェクトで受け取る. 含まれるidのものを探して更新する.
      Object.assign(state.myData, payload)
      // ストレージにセーブ
      const parsedData = JSON.stringify(state.myData)
      localStorage.setItem('myData', parsedData)
    },

    /* その他 */
    clearAllData({state}) {
      // 保存されているデータを削除する.
      if (confirm('全てのデータを消去しますか？ 復元はできません。')) {
        state.timeData.splice(0, state.timeData.length)
        state.clientData.splice(0, state.clientData.length)
        state.nextTimeDataId = 0
        state.nextClientDataId = 0
        state.currentClientId = -1
        localStorage.clear()
        alert('全てのデータを消去しました。端末にデータは残されていません。')
      }
    },
    async loadAll({dispatch}) {
      await dispatch('loadDate')
      await dispatch('loadTimeData')
      await dispatch('loadClientData')
      await dispatch('loadMyData')
    },
  },
  modules: {
  }
})
