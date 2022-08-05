<template>
    <button @click="setWallpaper" class="bg-picker">
        <img src="../assets/Icon.svg" alt="wallpaper">
    </button>
</template>

<script>
    export default {
        data(){
            return {
                backgrounds: [],
                api_key: 'GFaAiytzo5yD4JLlIuKhpOZYV4YhKjH6apbSlkNnU_0',
                prevNum: 0,
            };
        },
        methods: {
            fetchBackground() { 
                fetch(`https://api.unsplash.com/search/photos?per_page=30&query=gradients&client_id=${this.api_key}`)
                .then(res => {return res.json()}).then(this.storeBackgrounds);
            },
            storeBackgrounds(e){
                for(let i = 0; i < 30; i++){
                    this.backgrounds.push(e.results[i].urls.regular);
                }
                this.setWallpaper();
            },  
            setWallpaper() {
                const randomNum = Math.round(Math.random() * this.backgrounds.length);

                if(this.prevNum == randomNum) {
                    if(randomNum < 0){
                        randomNum++;
                    } else if (randomNum > this.backgrounds.length) {
                        randomNum--;
                    }

                }
                const randomBG = this.backgrounds[randomNum];
                this.$emit('changeBG', randomBG);

                this.prevNum = randomNum;
            }
        },
        created() {
            this.fetchBackground();
        }
    }
</script>

<style>
    .bg-picker {
        background: transparent;
        outline: none;
        border: none;
        position: absolute;
        top: 2.5%;
        right: 1.5%;
        cursor: pointer;
        display: block;
        transition: transform 200ms ease;
        padding: .45rem .55rem .3rem .6rem;
        border-radius: .5rem;
        background: rgba(255, 255, 255, 0.7);
    }
    .bg-picker:hover {
        transform: rotate(15deg) scale(1.1);
    }
    .bg-picker img {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: .25rem;
    }
</style>