<template>
  <div class="calc">
    <div id="calc-month-select">
      <button id="calc-prev-month" v-on:click.prevent="loadPrevMonth">前月</button>
      <h2>{{ year }}年：{{ month }}月</h2>
      <button id="calc-next-month" v-on:click.prevent="loadNextMonth">次月</button>
    </div>
    <div id="calc-data-box">
      <TimeDataRow v-for="data in filteredData" :key=data.id :time-data="data" v-on:delete="deleteData(data.id)"></TimeDataRow>
    </div>

    <div>
      <h3>総額</h3>
      <div>{{timeSum.hours}}時間{{timeSum.minutes}}分{{timeSum.seconds}}秒 * {{ payPerHour }}円/時</div>
      <div>今月の支払いは{{ monthPayment }}円です。</div>
      <button v-on:click.prevent="goToMailPage">メールを送信する</button>
    </div>
  </div>
</template>

<script>
import TimeDataRow from '../components/TimeDataRow.vue'
export default {
  name: 'calc',
  components: {
    TimeDataRow,
  },
  data: () => {
    return {
    }
  },
  computed: {
    year() {
      return this.$store.getters.getYear
    },
    month() {
      return this.$store.getters.getMonth
    },
    payPerHour() {
      if (this.$store.getters.getCurrentClientId >= 0) {
        return this.$store.getters.getCurrentClientData.pay
      } else {
        return 0
      }
    },
    filteredData() {
      return this.$store.getters.filteredTimeData
    },
    timeSum() {
      // 使用していない変数があるエラーを無視する
      // eslint-disable-next-line
      const sumSec = Math.trunc(this.filteredData.reduce((acc, curVal, curIdx, array) => {
        return acc + curVal.time
      }, 0) / 1000)
      const hours = Math.trunc(sumSec / 3600)
      const minutes = Math.trunc((sumSec % 3600) / 60)
      const seconds = sumSec % 60
      return {hours, minutes, seconds}
    },
    monthPayment() {
      const hour = this.timeSum.hours + this.timeSum.minutes / 60 + this.timeSum.seconds / 3600
      return Math.floor(hour * this.payPerHour)
    }
  },
  methods: {
    loadPrevMonth() {
      const prevMonth = (this.month + 10 ) % 12 + 1
      let newYear = this.year
      if (prevMonth === 12) {
        newYear -= 1
      }
      this.$store.dispatch('setDateAndSave', {month: prevMonth, year: newYear})
    },
    loadNextMonth() {
      this.message = 'next'
      const nextMonth = (this.month) % 12 + 1
      let newYear = this.year
      if (nextMonth === 1) {
        newYear += 1
      }
      this.$store.dispatch('setDateAndSave', {month: nextMonth, year: newYear})
    },
    deleteData(id) {
      if (window.confirm('このデータを消しますか？')) {
        this.$store.dispatch('deleteTimeDataById', {id})
      }
    },
  }
}
</script>

<style scoped>
#calc-month-select {
  display: flex;
  justify-content: space-around;
  margin: .9em 0;
}
</style>