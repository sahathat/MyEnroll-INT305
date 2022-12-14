<script setup>

defineProps({
    todos: {
        type: Array,
        required: true
    }
})

defineEmits(['toggle-completed','delete-todo'])
</script>
 
<template>
    <ol>
        <li v-for="todo in todos" :key="todo.id">
            isComplete: <span :class="{completed: todo.completed,uncompleted: !todo.completed}">[{{todo.completed ? "Yes": "No"}}]</span><br>
            title: {{todo.title}} &nbsp;
            <button @click="$emit('toggle-completed', todo)">Complete</button> &nbsp;
            <button @click="$emit('delete-todo', todo)">Delete</button> <br>
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