<template>
  <div class="settings">
    <div class="settings-mydata">
      <BlockWithChanger :label="'ユーザー名'" :text="myData.name" v-on:text-changed="changeMyName" />
      <BlockWithChanger :label="'メールアドレス'" :text="myData.email" :inputType="'email'" v-on:text-changed="changeMyEmail" />
    </div>
    <!--
    <form>
      <label for="my-name">ユーザー名</label>
      <input type="text" id="my-name" v-model="newMyName" /><br/>

      <label for="my-email">メールアドレス</label>
      <input type="email" id="my-email" v-model="newMyEmail" /><br/>
      <button v-on:click.prevent="saveMyData">保存</button>
    </form>
    -->
    <form>
      <label for="clear-data">全てのデータを消去</label>
      <button id="clear-data" v-on:click.prevent="clearAllData">消去</button>
    </form>
  </div>
</template>

<script>
import BlockWithChanger from '../components/BlockWithChanger.vue'
export default {
  name: 'settings',
  components: {
    BlockWithChanger
  },
  data: () => {
    return {
      newMyName: '',
      newMyEmail: '',
    }
  },
  computed: {
    myData() {
      return this.$store.getters.getMyData
    }
  },
  methods: {
    changeMyName(newName) {
      this.$store.dispatch('saveMyData', {
        name: newName
      })
    },
    changeMyEmail(newEmail) {
      this.$store.dispatch('saveMyData', {
        email: newEmail
      })
    },
    saveMyData() {
      this.$store.dispatch('saveMyData', {
        name: this.newMyName,
        email: this.newMyEmail
      })
    },
    clearAllData() {
      this.$store.dispatch('clearAllData')
    }
  }
}
</script>

<style scoped>
.settings-mydata {
  display: flex;
  justify-content: center;
  margin: 3rem auto;
}
.settings-mydata > div {
  margin: 0 4rem;
}
label {
  display: inline-block;
  margin-right: .5rem;
}
#clear-data:hover {
  background-color: #c88;
}
</style>