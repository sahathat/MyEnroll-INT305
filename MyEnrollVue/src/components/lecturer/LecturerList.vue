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
    <ul v-for="lecturer in lecturers" :key="lecturer.id">
        <li>
            <p>name: {{lecturer.name.firstname}} {{lecturer.name.lastname}}</p>
            <p>email: {{lecturer.email}}</p>
        </li>
    </ul>
</div>
</template>
 
<style>

</style>