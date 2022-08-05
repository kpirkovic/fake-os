<template>
    <a :id="name" :href="url" target="_blank" class="icon">
        <img :src="img" :alt="name">
    </a>
</template>

<script>
    export default {
        name: 'AppLink',
        data() {
            return {
                time: null,
            }
        },
        methods: {
        },
        props: {
            url: String,
            img: String,
            name: String
        }
    }
</script>

<style scoped>
    .popup {
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgb(238, 238, 238);
        padding: 1rem;
    }
    .icon img {
        display: block;
        width: 4rem;
    }
</style>