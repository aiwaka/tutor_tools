<template>
    <!--textを受け取り表示する. changeボタンを押すと編集でき, saveを押すとtext-changedをemitし変更後のデータを返す. オプションでinputTypeを指定するとテキストのバリデーションを設定できる.-->
    <div class="block-with-changer">
        <div class="label" v-if="label">{{label}}</div>
        <div class="text-space" v-if="show && !foldFlag" v-on:click="textClick">{{text}}</div>
        <div class="text-space" v-if="show && foldFlag" v-on:click="textClick">{{viewText}}</div>


        <button v-if="show" v-on:click.prevent="change">変更</button>
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
            alert(this.text)
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
    margin: .4rem 0;
}
</style>