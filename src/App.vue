<template>
    <div class="myDesktop" ref="background">
        <Clock/>
        <Popup :activeComponent="activeComponent" @createApp="addApp" :apps="apps"/>
        <div class="apps-dock">
            <div v-for="app in apps" class="app">
                <AppLink draggable="true" :url="app.appLink" :img="app.appImg" :name="app.appName"/>
            </div>
        </div>
        <RandomBG v-on:changeBG="changeBackground($event)"/>
    </div>
</template>

<script>  
    import AppLink from './components/AppLink.vue'
    import Clock from './components/Clock.vue'
    import Popup from './components/Popup.vue'
    import RandomBG from './components/RandomBG.vue'
    import {ref} from 'vue'

    export default {
        name: 'App',
        components: {
            AppLink,
            Clock,
            Popup,
            RandomBG,
        },
        methods: {
            changeBackground(e){
                this.$refs.background.style.backgroundImage = `url(${e})`
            },
            addApp(e){
                const len = this.apps.length - 1;
                this.apps.splice(len, 0, e);
            },
        },
        data(){
            return {
                bgURL: '',
                apps: [
                    {
                        appName: 'Calculator',
                        appLink: '',
                        appImg: require('@/assets/app-icons/Calculator.svg'),
                        isComponent: true,
                    },
                    {
                        appName: 'To-Do',
                        appLink: '',
                        appImg: require('@/assets/app-icons/To Do.svg'),
                        isComponent: true,
                    },
                    {
                        appName: 'Weather',
                        appLink: '',
                        appImg: require('@/assets/app-icons/Weather.svg'),
                        isComponent: true,
                    },
                    {
                        appName: 'Youtube',
                        appLink: 'https://youtube.com/',
                        appImg: require('@/assets/app-icons/Youtube.svg'),
                        isComponent: false,
                    },
                    {
                        appName: 'Instagram',
                        appLink: 'https://Instagram.com/',
                        appImg: require('@/assets/app-icons/Instagram.svg'),
                        isComponent: false,
                    },
                    {
                        appName: 'Add-App',
                        appLink: '',
                        appImg: require('@/assets/app-icons/Add app.svg'),
                        isComponent: true,
                    },
                ]
            }
        }
    }

</script>

<style>
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'Poppins', sans-serif;
    overflow: hidden;
  }
  .myDesktop {
    position: relative;
    width: 100vw;
    height: 100vh;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .apps-dock {
    position: absolute;
    bottom: 2.5%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: .55rem;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 1rem;
    outline: .8px solid rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(.5rem);
  }
  .app {
    transition: all 200ms ease;
    margin: .2rem .5rem;
    border-radius: 1rem;
    overflow: hidden;
  }
  .app:hover {
    margin: .3rem .75rem;
    transform: scale(1.2);
  }
</style>
