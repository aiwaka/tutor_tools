<template>
  <div class="mail">
    <form>
      <label for="mail-sendfrom">送信元</label><br/>
      <input disabled id="mail-sendfrom" v-model="sendFrom" /><br/>
      <label for="mail-sendto">送信先</label><br/>
      <input disabled id="mail-sendto" v-model="sendTo" /><br/>
      <label for="mail-subject">タイトル</label><br/>
      <input id="mail-subject" placeholder="subject" v-model="newSubject" /><br/>
      <label for="mail-text">本文</label><br/>
      <textarea id="mail-text" placeholder="text" v-model="newBody"></textarea>
    </form>
    <button v-on:click.prevent="send">送信</button>
  </div>
</template>

<script>
import Email from "../smtp.js"
export default {
  name: 'mail',
  data: () => {
    return {
      newSubject: '',
      newBody: '',
      sendTo: ''
    }
  },
  props: {
    subject: {
      type: String,
      default: ''
    },
    body: {
      type: String,
      default: ''
    }
  },
  created() {
    const myData = this.$store.getters.getMyData
    if (!myData.name || !myData.email) {
      alert('メールを利用するにはユーザー設定を行なってください。')
      this.$router.push('/settings')
      return
    }
    const clientData = this.$store.getters.getCurrentClientData
    if (!clientData) {
      alert('クライアントを一人選択してください。')
      this.$router.push('/clients')
      return
    }
    this.newSubject = this.subject
    this.newBody = this.body
    this.sendTo = clientData.email
    this.sendFrom = myData.email
  },
  methods: {
    send() {
      Email.send({
        Host : "smtp.elasticemail.com",
        Username : process.env.VUE_APP_SMTP_SERVER_USERNAME,
        Password : process.env.VUE_APP_SMTP_SERVER_PASS,
        To : this.$store.getters.getCurrentClientData.email,
        From : this.$store.getters.getMyData.email,
        Subject : this.newSubject,
        Body : this.newBody,
      }).then(
        //message => alert(message)
        message => {
          if (message === 'OK') {
            alert('送信が完了しました。')
          } else {
            alert('送信途中にエラーが発生しました。\n' + message)
          }
        }
      )
    }
  }
}
</script>

<style scoped>
input {
  width: 32rem;
}
textarea {
  width: 32rem;
  height: 18rem;
}
</style>