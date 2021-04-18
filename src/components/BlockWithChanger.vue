<template>
    <!--textを受け取り表示する. changeボタンを押すと編集でき, saveを押すとtext-changedをemitし変更後のデータを返す. オプションでinputTypeを指定するとテキストのバリデーションを設定できる.-->
    <div class="block-with-changer">
        <div class="text-space" v-if="show">{{text}}</div>
        <button v-if="show" v-on:click.prevent="change">Change</button>
        <input class="text-input" :type="inputType" v-if="!show" v-model="newText" />
        <button v-if="!show" v-on:click.prevent="save">Save</button>
    </div>
</template>

<script>
export default {
    name: 'BlockWithChanger',
    data: () => {
        return {
            show: true,
            newText: ''
        }
    },
    props: {
        text: {
            default: ''
        },
        inputType: {
            type: String,
            default: 'text',
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
        }
    }
}
</script>

<style scoped>
.block-with-changer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 11rem;
}
.text-space {
    width: 5em;
    word-wrap: break-word;
    margin: auto
}
.text-input {
    width: 5em;
    margin: auto;
}
button {
    margin: .6rem 0;
}
</style>