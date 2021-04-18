<template>
  <div class="time-data-row">
    <div>{{timeData.date.month}}月{{ timeData.date.day }}日（{{ timeData.date.weekday }}）</div>
    <div>{{ timeObj.hours }}時間{{ timeObj.minutes }}分{{timeObj.seconds}}秒</div>

    <div class="eraser" v-on:click="clickDeleteButton">×</div>
  </div>
</template>

<script>

export default {
  name: 'TimeDataRow',
  props: {
    timeData: {
        type: Object,
        required: true,
    },
  },
  computed: {
    timeObj() {
      const sec = Math.trunc(this.timeData.time / 1000)
      const hours = Math.trunc(sec / 3600)
      const minutes = Math.trunc((sec % 3600) / 60)
      const seconds = sec % 60
      return {hours, minutes, seconds}
    }
  },
  methods: {
    clickDeleteButton() {
      this.$emit('delete')
    }
  }
}
</script>

<style scoped>
.time-data-row {
    display: flex;
    width: 100%;
}
.time-data-row > div {
    width: 30em;
}
div.eraser {
  width: 1rem;
}
div.eraser:hover {
  cursor: pointer;
}
</style>
