<template>
  <!--clientデータを表示する行. それぞれのデータはBlockWithChangerを使って変更可能なようにする.-->
  <div class="client-data-row">
    <div class="set-button">
      <button :disabled="currentClientId === dataId" v-on:click.prevent="setCurrentClient">Set</button>
    </div>

    <BlockWithChanger class="content-name" :text="clientData.name" v-on:text-changed="changeName"/>
    <BlockWithChanger class="content-email" :text="clientData.email" v-on:text-changed="changeEmail"/>
    <BlockWithChanger class="content-pay" :text="clientData.pay" :inputType="'number'" v-on:text-changed="changePay"/>
    <BlockWithChanger class="content-schedule" :text="clientData.schedule" v-on:text-changed="changeSchedule"/>
    <BlockWithChanger class="content-memo" :text="clientData.memo" v-on:text-changed="changeMemo"/>

    <div class="eraser" v-on:click.prevent="clickDeleteButton">×</div>
  </div>
</template>

<script>
import BlockWithChanger from './BlockWithChanger.vue'
export default {
  name: 'ClientDataRow',
  components: {
    BlockWithChanger
  },
  data: () => {
    return {
      showModal: false
    }
  },
  props: {
    clientData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    dataId() {
      return this.clientData.id
    },
    currentClientId() {
          return this.$store.getters.getCurrentClientId
      }
  },
  methods: {
    clickDeleteButton() {
      this.$emit('delete')
    },
    setCurrentClient() {
      this.$emit('setCurrentClient')
    },
    changeName(text) {
      this.$store.dispatch('modifyClientData', {
        id: this.dataId,
        name: text
      })
    },
    changeEmail(text) {
      this.$store.dispatch('modifyClientData', {
        id: this.dataId,
        email: text
      })
    },
    changePay(text) {
      this.$store.dispatch('modifyClientData', {
        id: this.dataId,
        pay: parseInt(text)
      })
    },
    changeSchedule(text) {
      this.$store.dispatch('modifyClientData', {
        id: this.dataId,
        schedule: text
      })
    },
    changeMemo(text) {
      this.$store.dispatch('modifyClientData', {
        id: this.dataId,
        memo: text
      })
    }
  }
}
</script>

<style scoped>
.client-data-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.set-button {
  margin: auto 1rem;
}
div.eraser {
  width: 1rem;
  margin: 0 .8rem;
}
div.eraser:hover {
  cursor: pointer;
}
</style>
