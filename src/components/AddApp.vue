<template>
    <div class="add-app">
        <form>
            <form>
                <h2>Let's add a new App</h2>
                <input v-model="url" placeholder="App URL Here..." type="url">
                <input ref="add" @click="addApp" type="submit" value="Add App">
                <span v-if="error">Input is either empty or invalid</span>
            </form>
        </form>
    </div>
</template>

<script>
    import {ref} from 'vue'
    export default {
        name: 'AddApp',
        data() {
            return {
                url: '',
                name: '',
                error: false,
            }
        },
        methods: {
            addApp(e){
                e.preventDefault();
                if(this.url != '' && this.url.includes('https://', '.com')) {
                    const newApp = 
                    {
                        appLink: this.url,
                        appName: this.url.substring(this.url.indexOf('.') + 1, this.url.lastIndexOf('.')),
                        appImg: `https://plus.google.com/_/favicon?domain_url=${this.url}/&sz=256`
                    }

                    this.error = false;
                    this.$refs.add.classList.remove('active');
                    
                    this.url = '';

                    this.$emit('pushApp', newApp);
                } else {
                    this.error = true;
                    this.$refs.add.classList.add('active');
                }
            }
        }
    }
</script>

<style scoped>
    .add-app {
        width: 22rem;
        padding: 2rem 1rem;
    }
    form {
        display: flex;
        flex-direction: column;
        gap: .5rem;
    }
    input {
        border: none;
        border-radius: .25rem;
        outline: none;
        padding: .59rem;
        font-family: 'Poppins', sans-serif;
        box-shadow: 0 5px 10px rgba(0, 0, 0, .05);
    }
    input[type='submit'] {
        background: lightseagreen;
        color: white;
        cursor: pointer;
        box-shadow: 0 5px 10px rgba(0, 0, 0, .05);
    }
    input[type='submit'].active {
        animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
    }
    h2 {
        font-weight: 500;
        font-size: 1.4rem;
        margin-block-end: .5rem;
    }
    @keyframes shake {
        10%, 90% {
            transform: translate3d(-1px, 0, 0);
        }
        
        20%, 80% {
            transform: translate3d(2px, 0, 0);
        }

        30%, 50%, 70% {
            transform: translate3d(-4px, 0, 0);
        }

        40%, 60% {
            transform: translate3d(4px, 0, 0);
        }
    }
    span {
        color: rgb(192, 59, 59);
        text-align: center;
        font-size: .9rem;
    }
</style>