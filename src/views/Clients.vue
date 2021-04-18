<template>
    <div class="clients">
        <h1>Clients</h1>
        <span>顧客の名前、連絡先、時給額、スケジュール、メモを設定できます。Setボタンを押すことで現在の顧客をセットします。</span>
        <div class="clients-contents">
            <ClientDataRow v-for="client in clientData"
            :key="client.id"
            :client-data="client"
            v-on:delete="deleteData(client.id)"
            v-on:setCurrentClient="setCurrentClient(client.id)"
            :class="{'current-client': currentClientId === client.id}" />
        </div>
        <div class="register">
            <h2>新規登録</h2>
            <span>赤枠は必須項目</span>
            <form>
                <label for="clients-name" required>名前</label>
                <input id="clients-name" type="text" v-model="newClientName" required/><br/>
                <label for="clients-email" required>Emailアドレス</label>
                <input id="clients-email" type="email" v-model="newClientEmail" required/><br/>
                <label for="clients-pay" required>時給額</label>
                <input id="clients-pay" type="number" v-model="newClientPay" required/><br/>
                <label for="clients-schedule">時間</label>
                <input id="clients-schedule" type="text" v-model="newClientSchedule"/><br/>
                <label for="clients-memo">メモ</label>
                <input id="clients-memo" type="text" v-model="newClientMemo"/><br/>
                <button id="register-button" v-on:click.prevent="addNewClient">登録</button>

            </form>
        </div>
    </div>
</template>

<script>
import ClientDataRow from '../components/ClientDataRow.vue'
export default {
  name: 'settings',
  components: {
    ClientDataRow,
  },
  data: () => {
    return {
        newClientName: null,
        newClientEmail: null,
        newClientPay: null,
        newClientSchedule: '',
        newClientMemo: '',
    }
  },
  computed: {
      clientData() {
          return this.$store.getters.getClientData
      },
      payPerHour() {
          return this.$store.getters.getPayPerHour
      },
      currentClientId() {
          return this.$store.getters.getCurrentClientId
      }
  },
  methods: {
    addNewClient() {
        if (!this.newClientName) {
            alert('名前を入力してください。')
            return
        }
        // メールアドレスにマッチするか正規表現で確認
        const REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(!REGEX_EMAIL.test(this.newClientEmail)) {
            alert('有効なメールアドレスを入力してください。')
            return
        }
        if(!this.newClientPay || this.newClientPay < 0) {
            alert('時給額を設定してください。')
            return
        }
        this.$store.dispatch('saveClientData', {
            name: this.newClientName,
            email: this.newClientEmail,
            pay: parseInt(this.newClientPay),
            schedule: this.newClientSchedule,
            memo: this.newClientMemo,
        })
        this.newClientName = null
        this.newClientEmail = null
        this.newClientSchedule = ''
        this.newClientMemo = ''
    },
    deleteData(id) {
      if (window.confirm('このデータを消しますか？')) {
        this.$store.dispatch('deleteClientDataById', {id})
      }
    },
    setCurrentClient(id) {
        this.$store.dispatch('setCurrentClient', {id})
    }
  }
}
</script>

<style scoped>
.clients-contents {
    border: 1px solid #aaa;
}
.register {
    border: 3px dotted #aaa;
    margin: 2em 1%;
}
#register-button {
    margin: 1em auto;
}
form > input {
    width: 10em;
    margin: 2px 3px;
}
form > label {
    display: inline-block;
    width: 10em;
    margin: 2px 3px;
}
label[required] {
    /*content: 必須;*/
    border: 1px solid #f00;
}
.clients-contents {
    overflow-x: auto;
    margin-bottom: 3em;
}
.current-client {
    background-color: greenyellow;
}
.content-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 70%;
    border: 2px solid #999;
}
</style>