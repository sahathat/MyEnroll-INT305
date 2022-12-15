<script setup>
import { RouterLink } from 'vue-router'

defineProps({
    semesters: {
        type: Array,
        required: true
    }
})
</script>
 
<template>
<div>
    <h3>semesters</h3>
    <ul v-for="semester in semesters" :key="semester.id">
        <li>
            <RouterLink :to="'/'+semester.id" >term: {{semester.term}} year: {{semester.year}}</RouterLink>
        </li>
    </ul>
</div>
</template>
 
<style>

</style>