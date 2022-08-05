<template>
    <div class="calculator">
       <div class="display dark">{{current}}</div>
       <div @click="precent">%</div>
       <div @click="sign" class="fs-small">+/-</div>
       <div @click="clear">C</div>
       <div @click="divide" class="fs-large">÷</div>
       <div @click="append(7)" >7</div>
       <div @click="append(8)" >8</div>
       <div @click="append(9)" >9</div>
       <div @click="times">x</div>
       <div @click="append(4)" >4</div>
       <div @click="append(5)" >5</div>
       <div @click="append(6)" >6</div>
       <div @click="minus">-</div>
       <div @click="append(1)" >1</div>
       <div @click="append(2)" >2</div>
       <div @click="append(3)" >3</div>
       <div @click="add">+</div>
       <div @click="append(0)" class="zero">0</div>
       <div @click="dot">.</div>
       <div @click="equal">=</div>
    </div>
</template>

<script>
    export default {
        name: 'Calculator',
        data () {
            return {
                current: '',
                operator: null,
                previous: null,
                operatorClicked: false
            }
        },
        methods: {
            clear() {
                this.current = '';
            },
            sign() {
                if(this.current != '' && this.current != 0){
                    this.current = this.current.charAt(0) == '-' ? this.current.slice(1) : `-${this.current}`
                }
            },
            precent() {
                this.current = `${parseFloat(this.current) / 100}`
            },
            append(number) {
                if(this.operatorClicked) {
                    this.current = '';
                    this.operatorClicked = false;
                }
                this.current = `${this.current}${number}`
            },
            dot() {
                if(this.current != ''){
                    this.append('.');
                }
            },
            setPrevious() {
                this.previous = this.current;
                this.operatorClicked = true;
            },
            divide() {
                this.operator = (a, b) => a / b;
                this.setPrevious();
            },
            times() {
                this.operator = (a, b) => a * b;
                this.setPrevious();
            },
            add() {
                this.operator = (a, b) => a + b;
                this.setPrevious();
            },
            minus() {
                this.operator = (a, b) => a - b;
                this.setPrevious();
            },
            equal() {
                if(this.current != '' && this.current != null && this.previous != '' && this.previous != null){
                    this.current = `${this.operator(parseFloat(this.current), parseFloat(this.previous))}`;
                    this.previous = null;
                }
            },
        }
    }
</script>

<style scoped>
    .calculator {
        width: 20rem;
        gap: .25rem;
        display:  grid;
        text-align: center;
        font-size: 1.2rem;
        grid-template-columns: repeat(4, 1fr);
        grid-auto-rows: minmax(4rem, auto);
    }
    .calculator > div {
        padding: 1.2rem;
        cursor: pointer;
        background: rgb(255, 255, 255, .7);
        border-radius: .35rem;
        transition: background 200ms ease;
    }
    .calculator > div:hover {
        background: white;
    }
    .display {
        grid-column: 1 / 5;
        height: 3.99rem;
        text-align: right;
    }
    .dark {
        background: rgba(22, 22, 22, 0.85)!important;
        color: white;
        margin-block-end: .2rem;
    }
    .fs-small {
        font-size: 1rem;
    }
    .fs-large {
        font-size: 1.4rem;
    }
    .zero {
        grid-column: 1 / 3;
    }
</style>