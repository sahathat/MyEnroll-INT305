<script setup>
defineProps({
    lecturers: {
        type: Array,
        required: true
    }
})
</script>
 
<template>
<div>
    <h3>Lecturer List</h3>
    <ul v-for="lecturer in lecturers" :key="lecturer.id">
        <li>
            <p>lecturer name: {{lecturer.name}}</p>
            <p>lecturer email: {{lecturer.email}}</p>
        </li>
    </ul>
</div>
</template>
 
<style>

</style>