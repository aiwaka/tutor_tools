<template>
    <!--textを受け取り表示する. changeボタンを押すと編集でき, saveを押すとtext-changedをemitし変更後のデータを返す. オプションでinputTypeを指定するとテキストのバリデーションを設定できる.-->
    <div class="block-with-changer">
        <div class="label" v-if="label">{{label}}</div>
        <div class="text-space" v-if="show && !foldFlag" v-on:click="textClick">{{text}}</div>
        <div class="text-space" v-if="show && foldFlag" v-on:click="textClick">{{viewText}}</div>
        <div class="whole-text-container">
            <div class="whole-text" v-if="showWholeText">
                <p>{{text}}</p>
            </div>
        </div>
        <div class="button-container">
            <button v-if="show" v-on:click.prevent="change">変更</button>
            <button v-if="show" v-on:click.prevent="copyToClipBoard(text)">コピー</button>
        </div>
        <input class="text-input" :type="inputType" v-if="!show" v-model="newText" />
        <button v-if="!show" v-on:click.prevent="save">保存</button>
    </div>
</template>

<script>
export default {
    name: 'BlockWithChanger',
    data: () => {
        return {
            show: true,
            showWholeText: false,
            newText: '',
        }
    },
    props: {
        label: {
            type: String,
            default: ''
        },
        text: {
            default: ''
        },
        inputType: {
            type: String,
            default: 'text',
        },
    },
    computed: {
        foldFlag() {
            return this.text.length > 17
        },
        viewText() {
            if (this.foldFlag) {
                return this.text.slice(0, 17) + '...'
            } else {
                return 'folded'
            }
        }
    },
    methods: {
        change() {
            this.newText = this.text
            this.show = false
        },
        save() {
            this.$emit('text-changed', this.newText)
            this.show = true
        },
        textClick() {
            this.showWholeText = !this.showWholeText
        },
        copyToClipBoard(text) {
            navigator.clipboard
            .writeText(text)
            .catch( e => {
                console.error(e)
            })
        }
    }
}
</script>

<style scoped>
.label {
    font-weight: bold;
}
.block-with-changer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 11rem;
}
.button-container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
.text-space {
    width: 10rem;
    word-wrap: break-word;
    margin: auto
}
.text-input {
    width: 10rem;
    margin: auto;
}
button {
    margin: .4rem .3rem;
    font-size: 0.9rem;
}
.whole-text-container {
    position: relative;
}
.whole-text {
  position: absolute;
  top: 1rem;
  left: -8rem;

  padding: .6rem 1rem;
  width: 16rem;
  word-wrap: break-word;
  color: inherit;
  background: #babb9d;
}
.whole-text:before {
  content: "";
  position: absolute;
  top: -3rem;
  left: 50%;
  margin-left: -15px;
  border: 15px solid transparent;
  border-bottom: 15px solid #babb9d;
}
.whole-text p {
  margin: 0;
  padding: 0;
}
</style>