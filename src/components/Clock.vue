<template>
    <div class="clock">
        <h2>{{time}}</h2>
    </div>
</template>

<script>
    export default {
        name: 'Clock',
        data () {
            return {
                time: '',
            }
        },
        beforeMount (){
            this.showTime();
        },
        methods: {
            showTime() {
                let date = new Date();
                let h = date.getHours(); 
                let m = date.getMinutes(); 
                let s = date.getSeconds(); 
                let session = "AM";
                
                if(h == 0){
                    h = 12;
                }
                
                if(h > 12){
                    h = h - 12;
                    session = "PM";
                }
                
                h = (h < 10) ? "0" + h : h;
                m = (m < 10) ? "0" + m : m;
                s = (s < 10) ? "0" + s : s;
                
                let time = h + ":" + m + ":" + s + " " + session;
                this.time = time;
                
                setTimeout(this.showTime, 1000);
            }
        }
    }

</script>

<style>
    .clock {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        pointer-events: none;
        user-select: none;
    }
    .clock h2 
    {
        font-size: clamp(3rem, 10vw, 7rem);
        font-weight: 300;
        white-space: nowrap;
        color: rgba(255, 255, 255, 0.3);
    }
</style>