<template>
    <div ref="popup" :class="showPopup != false ? 'popup active' : 'popup'">
        <div class="popup-header" @mousedown="mouseDown" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
            <span class="app-heading">{{activeComponent}}</span>
            <span @click="closeApp" class="close">✖</span>
        </div>
        <component @pushApp="this.$emit('createApp', $event)" :is="activeComponent"/>
    </div>
</template>
<script>
    import {ref} from 'vue'
    import Calculator from './Calculator.vue'
    import ToDo from "./ToDo.vue"
    import Weather from "./Weather.vue"
    import AddApp from "./AddApp.vue"

    export default {
        name: 'Popup',
        props: {
            activeComponent: String,
            apps: Object
        },
        components: {
            Calculator,
            ToDo,
            Weather,
            AddApp,
        },
        data() {
            return {
                showPopup: false,
                activeComponent: '',
            }
        },
        methods: {
            findApp(e){
                const el = this.apps.find(x => x.appName === e.target.closest('a').id);

                if(el.isComponent){
                    e.preventDefault();
                    this.showPopup = true;
                    this.activeComponent = el.appName;
                }
            },
            closeApp(){
                this.showPopup = false;
                setTimeout(()=> {
                    this.activeComponent = '';
                    this.$refs.popup.style.position = 'relative';
                    this.$refs.popup.style.top = '0';
                    this.$refs.popup.style.left = '0';
                },300)
            },
            mouseEnter(e){
                this.$refs.popup.style.cursor = 'grab';
            },
            mouseLeave(e){
                this.$refs.popup.style.cursor = 'auto';
            },
            mouseDown(e){
                this.$refs.popup.style.cursor = 'grabbing';
                this.$refs.popup.transform = 'none';

                window.addEventListener('mousemove', this.mouseMove);
                window.addEventListener('mouseup', this.mouseUp);

                this.prevX = e.clientX;
                this.prevY = e.clientY;
            },
            mouseMove(e){
                let newX = this.prevX - e.clientX;
                let newY = this.prevY - e.clientY;
                
                const rect = this.$refs.popup.getBoundingClientRect();

                let x = rect.left - newX; 
                let y = rect.top - newY; 

                if(x < 0) x = 0;
                if(y < 0) y = 0;
                if(x > window.innerWidth - rect.width) x = window.innerWidth - rect.width;
                if(y > window.innerHeight - rect.height) y = window.innerHeight - rect.height;

                this.$refs.popup.style.position = 'absolute';
                this.$refs.popup.style.left = x + 'px';
                this.$refs.popup.style.top = y + 'px';

                this.$refs.popup.style.userSelect = 'none';

                this.prevX = e.clientX;
                this.prevY = e.clientY
            },
            mouseUp(){
                this.$refs.popup.style.cursor = 'auto';
                this.$refs.popup.style.userSelect = 'auto';

                window.removeEventListener('mousemove', this.mouseMove);
                window.removeEventListener('mouseup', this.mouseUp);
            }
        },
        mounted(){ 
            window.addEventListener('click',this.findApp);
        }
    }
</script>

<style>
    .popup {
        position: relative;
        transform: scale(0);
        transform-origin: bottom;
        padding: .5rem;
        overflow: hidden;
        background: rgb(255, 255, 255, .7);
        backdrop-filter: blur(1rem);
        transition: opacity 300ms ease, transform 300ms ease;
        opacity: 0;
        box-shadow: 0 .2rem 1rem rgba(0, 0, 0, 0.15);
        border-radius: .5rem;
        outline: 1px solid rgba(255, 255, 255, 0.8);
    }
    .popup.active {
        opacity: 1;
        transform: scale(1); 
    }
    .close {
        width: 1.5rem;
        height: 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: background 200ms ease;
        border-radius: .25rem;
    }
    .close:hover {
        background: rgb(0, 0, 0, .3);
    }
    .popup-header {
        display: flex;
        justify-content: space-between;
        margin-block-end: .7rem;
    }
    .app-heading {
        font-weight: 500;
    }
</style>