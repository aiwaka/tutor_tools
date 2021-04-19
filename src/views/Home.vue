<template>
  <div class="home">
    <!--<img alt="Vue logo" src="../assets/logo.png">-->
    <h1>Tutor tools</h1>
    <h2>使い方</h2>
    <ul>
      <li>まずSettingsページで自分の設定をします。</li>
      <li>次にClientページで顧客リストを作ります（一人でも可）。</li>
      <li>現在対応している顧客に対してSetボタンを押します。</li>
      <li>これでストップウォッチ機能と業務履歴の管理ができます。</li>
      <li>Calclationページからメールを生成することが可能です。</li>
      <li>顧客のセットはいつでも可能で、自動で管理対象が切り替わります。</li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'Home',
}
</script>

<style scoped>
.home {
  margin: auto;
}
h1 {
  font-size: 6rem;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
</style>