<template>
    <div class="watch">
        <h1>Watch</h1>
        <div v-if="year">
            <p>{{ year }}年{{ month + 1 }}月{{day}}日（{{ weekdayStr }}曜日）</p>
        </div>

        <div>経過時刻：{{ elapsedHours }}：{{ elapsedMinutes }}：{{ elapsedSeconds }}</div>
        <button v-if="!counting" v-on:click.prevent="startTimer">スタート</button>
        <button v-if="counting" v-on:click.prevent="stopTimer">ストップ</button>
        <button v-if="!counting && status" v-on:click.prevent="resetTimer">リセット</button>
        <div class="operations-list">
            <div class="operations-item" v-for="item in operations" :key=item.id>
                <div class="operations-item-id">
                    {{item.id}}
                </div>
                <div class="operations-item-date">
                    {{item.date.hour}}：{{item.date.minute}}：{{item.date.second}}
                </div>
                <div class="operations-item-operation">
                    {{item.operation}}
                </div>
            </div>
        </div>
        <button class="saving" v-if="!counting && status" v-on:click.prevent="saveTime">保存</button>

        <form>
            <input type="number" placeholder="year" v-model="devYear"/>
            <input type="number" placeholder="month" v-model="devMonth"/>
            <input type="number" placeholder="day" v-model="devDay"/>
            <input type="number" placeholder="milisec" v-model="devMiliSec"/>
            <button v-on:click.prevent="devSaveTime">save</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Watch',
    data: () => {
        return {
            counting: false,
            status: null,
            startTime: null, // Date.now()などで取得できるミリ秒を保持する.
            elapsedTime: 0,
            timeoutId: null,
            operations: [], // ストップウォッチの操作を保存する配列
            operationsId: 1,

            // 開発用のテスト変数
            devYear: 2021,
            devMonth: 4,
            devDay: 3,
            devMiliSec: 3600000,
        }
    },
    computed: {
        nowTimeObj() {
            return new Date(Date.now())
        },
        year() {
            return this.nowTimeObj.getFullYear()
        },
        month() {
            return this.nowTimeObj.getMonth()
        },
        day() {
            return this.nowTimeObj.getDate()
        },
        weekday() {
            return this.nowTimeObj.getDay()
        },
        weekdayStr() {
            const weekdayArray = ['日','月','火','水','木','金','土']
            return weekdayArray[this.weekday]
        },
        elapsedTimeObj() {
            return new Date(this.elapsedTime)
        },
        // 以下は時間の差を元にしたDateオブジェクトを使うので, getHoursなどを使うと標準時と9時間ずれてしまう.
        // getUTCHoursなどを使う.
        elapsedHours() {
            return new String(this.elapsedTimeObj.getUTCHours()).padStart(2, '0')
        },
        elapsedMinutes() {
            return new String(this.elapsedTimeObj.getUTCMinutes()).padStart(2, '0')
        },
        elapsedSeconds() {
            return new String(this.elapsedTimeObj.getUTCSeconds()).padStart(2, '0')
        }
    },
    methods: {
        startTimer() {
            // 本来はクライアントを選択していないときのアラートだがデバッグでは面倒なのでこのようにしておく
            if(this.$store.getters.getCurrentClientId < 0) {
                alert('まずクライアントを一人選択してください.')
                this.$router.push({name: 'clients'})
            }
            this.status = 1
            this.counting = true
            // Date.now()はUTC基準の経過時間を整数で返す.
            // elapsedTimeを引いた値をstartTimeにすることで経過時間からのタイマーの再開ができる.
            this.startTime = Date.now() - this.elapsedTime
            // 操作を記録する配列に追加する
            this.operations.push({
                id: this.operationsId++,
                date: this.dateMilisecToParams(),
                operation: 'start'
            })
            this.countUp()
        },
        countUp() {
            // 再起的にカウンタを呼ぶ. タイマーのidを保存しておけばいつでもストップできる
            this.timeoutId = setTimeout(() => {
                this.elapsedTime = Date.now() - this.startTime
                this.countUp()
            }, 1000)
        },
        stopTimer() {
            this.counting = false
            clearTimeout(this.timeoutId)
            this.operations.push({
                id: this.operationsId++,
                date: this.dateMilisecToParams(),
                operation: 'stop'
            })
        },
        resetTimer() {
            this.status = 0,
            this.counting = false
            this.elapsedTime = 0
            this.operations.push({
                id: this.operationsId++,
                date: this.dateMilisecToParams(),
                operation: 'reset'
            })
        },
        dateMilisecToParams() {
            // 現在現地時刻を適切な文字列にした時間・分・秒のオブジェクトを返す.
            const date = new Date(Date.now())
            return {
                hour: new String(date.getHours()).padStart(2, '0'),
                minute: new String(date.getMinutes()).padStart(2, '0'),
                second: new String(date.getSeconds()).padStart(2, '0')
            }
        },
        saveTime() {
            this.$store.dispatch('saveTimeData', {
                date: {
                    year: this.year,
                    month: this.month + 1,
                    day: this.day,
                    weekday: this.weekdayStr
                },
                time: this.elapsedTime
            })
            this.resetTimer()
            this.$set(this, "operations", []) // 直接operations = [] とするとVueは検知してくれない
            this.operationsId = 1
        },
        devSaveTime() {
            this.$store.dispatch('saveTimeData', {
                date: {
                    year: parseInt(this.devYear),
                    month: parseInt(this.devMonth),
                    day: parseInt(this.devDay),
                    weekday: '月'
                },
                time: parseInt(this.devMiliSec)
            })
        },
    }
}
</script>