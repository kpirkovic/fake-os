<template>
    <div class="to-do">
        <form>
            <h2>Daily Task Tracker</h2>
            <input v-model="input" maxlength="30" placeholder="Write your task here..." type="text">
            <input ref="task" @click="addTask" type="submit" value="Add Task">
            <span class="error" v-if="error">You need to add something!</span>
        </form>
        <ul>
            <li v-for="task in tasks">
                {{task.name}}
                <span class="checkbox" @click="taskChecked(task.id)"><i class="fa-solid fa-check"></i></span>
            </li>
        </ul>
    </div>
</template>

<script>
    import {ref} from 'vue'
    export default {
        name: 'ToDo',
        data() {
            return {
                tasks: [],
                input: '',
                error: false,
            }
        },
        methods: {
            async addTask(e){
                e.preventDefault();
                if(this.input){
                    const newTask = {name: this.input};

                    const res = await fetch('api/todos', {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json',
                        },
                        body: JSON.stringify(newTask)
                    })

                    const data = await res.json();

                    this.tasks = [...this.tasks, data];
                    this.input = '';

                    this.error = false;
                    this.$refs.task.classList.remove('active');
                } else {
                    this.error = true;
                    this.$refs.task.classList.add('active');
                }
            },
            async taskChecked(id){
                const res = await fetch(`api/todos/${id}`, {
                    method: 'DELETE',
                })
                const pos = this.tasks.findIndex(x => x.id === id);
                
                if(res.status === 200){
                    this.tasks.splice(pos, 1);
                }
            },
            async fetchTasks() {
                const res = await fetch('api/todos');

                const data = await res.json()

                return data;
            }
        },
        async created() {
            this.tasks = await this.fetchTasks();
        }
    }
    
</script>

<style scoped>
    .to-do {
        width: 22rem;
        padding: 1rem;
    }
    form {
        display: flex;
        flex-direction: column;
        gap: .5rem;
        padding: 1rem 0;
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
    input[type='checkbox'] {
        height: .9rem;
        width: .9rem;
    }
    ul {
        display: flex;
        flex-direction: column;
        gap: .7rem;
        max-height: 15rem;
        overflow-y: scroll;
    }
    li {
        padding: .25rem .5rem;
        background: rgba(255, 255, 255, 0.25);
        border-radius: .25rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: .9rem;
        padding: .59rem .75rem;
        transition: all 300ms ease;
        animation: scaleIn forwards 300ms ease;
        box-shadow: 0 5px 10px rgba(0, 0, 0, .05);
    }
    .error {
        color: rgb(192, 59, 59);
        text-align: center;
        font-size: .9rem;
    }
    .checkbox {
        color: rgba(0, 0, 0, 0.7);
        font-size: 1rem;
        transition: all 200ms ease;
        display: block;
    }
    .checkbox:hover {
        cursor: pointer;
        transform: scale(1.1) rotateZ(15deg);
    }
    ul::-webkit-scrollbar {
    width: .3rem;
    }

    /* Track */
    ul::-webkit-scrollbar-track {
    background: #f1f1f100;
    }

    /* Handle */
    ul::-webkit-scrollbar-thumb {
    background: lightseagreen;
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
    @keyframes scaleIn {
        from {
            transform: scale(0);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
    @keyframes scaleDown {
        from {
            transform: scale(1);
            opacity: 1;
        }
        to {
            transform: scale(0);
            opacity: 0;
        }
    }
    h2 {
        font-weight: 500;
        font-size: 1.4rem;
        margin-block-end: .5rem;
    }
</style>