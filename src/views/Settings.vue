<template>
  <div class="settings">
      <form>
          <label for="clear-data">全てのデータを消去</label>
          <button id="clear-data" v-on:click.prevent="clearAllData">消去</button>
      </form>
  </div>
</template>

<script>
export default {
  name: 'settings',
  data: () => {
    return {
    }
  },
  computed: {
  },
  methods: {
    clearAllData() {
      this.$store.dispatch('clearAllData')
    }
  }
}
</script>

<style scoped>
label {
  display: inline-block;
  margin-right: .5rem;
}
</style>