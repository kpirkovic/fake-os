<template>
    
</template>

<script>
   

    export default {
        name: 'Simple OS',
        components: {
            AppLink,
            Clock,
            Popup
        }, 
        
        methods: {
            
        }
    }

</script>

<style scoped>
    .os-wraper {
        position: relative;
        width: 100vw;
        height: 100vh;
        background-size: cover;
        background-image: url('https://images.unsplash.com/photo-1554034483-04fda0d3507b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80');
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
    }
    .app {
        transition: all 200ms ease;
        margin: .2rem .5rem;
    }
    .app:hover {
        margin: .3rem .75rem;
        transform: scale(1.2);
    }
</style>