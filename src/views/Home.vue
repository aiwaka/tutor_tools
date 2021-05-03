<template>
  <div class="home">
    <!--<img alt="Vue logo" src="../assets/logo.png">-->
    <h1>Tutor tools</h1>
    <h2>What's Tutor tools</h2>
    <p>
      個人で家庭教師などを行う人向けのWebアプリです。顧客それぞれに対して指導時間を記録し、時給から賃金を自動で計算することができます。各顧客に対する簡単なメモも搭載しています。スマートフォンからでも使いやすいデザインになっています。データは全て端末に保存され、外部との通信を行うことはありません。そのため個人情報は安全です。
    </p>
    <h2>How to use</h2>
    <ul>
      <li>Settingsページで自分の設定をします。</li>
      <li>次にClientページで顧客リストを作ります（一人でも可）。</li>
      <li>現在対応している顧客に対してSetボタンを押します。</li>
      <li>これでストップウォッチ機能と業務履歴の管理ができます。</li>
      <li>Calclationページからメールを生成することが可能です。</li>
      <li>顧客のセットはいつでも可能で、自動で管理対象が切り替わります。</li>
    </ul>
    <h2>Note</h2>
    <ul>
      <li>メール機能は実装中なので非推奨です。</li>
      <li>ストップウォッチはページを再読み込みすると停止してしまいますので注意してください。タブを切り替えたりブラウザアプリを離れたりしても停止しません。</li>
      <li>このアプリを使用して起きた問題に対して製作者は責任を負いません。</li>
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
p {
  margin: .4rem inherit;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
</style>