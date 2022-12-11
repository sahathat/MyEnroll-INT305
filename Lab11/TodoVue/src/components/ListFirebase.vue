<script>
export default {
    name: "ListFirebase",
    created() {
    },
    data() {
        return this.todos
    },
    props: ["todos"],
    methods: {
        toggleCompleted(todo){
            this.$emit('toggle-completed',todo)
        },
        deleteTodo(todo){
            this.$emit('delete-todo',todo)
        }
    }
}
</script>
 
<template>
    <ol>
        <li v-for="todo in todos" :key="todo.id">
            isComplete: <span :class="{completed: todo.completed,uncompleted: !todo.completed}">[{{todo.completed ? "Yes": "No"}}]</span><br>
            title: {{todo.title}} &nbsp;
            <button @click="toggleCompleted(todo)">Complete</button> &nbsp;
            <button @click="deleteTodo(todo)">Delete</button> <br>
            create on: {{todo.createdAt.toDate()}}
        </li>
    </ol>
</template>
 
<style scoped>
.completed {
    color: green;
}

.uncompleted {
    color: red;
}
</style>