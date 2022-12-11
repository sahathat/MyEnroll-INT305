<script setup>
defineProps({
    courses: {
        type: Array,
        required: true
    },
    count: {
        type: Number,
        required: true
    }
})

</script>
 
<template>
<div>
    <h3>Course List ({{ count }})</h3>
    <ul v-for="course in courses" :key="course.id">
        <li>
            <p>code: {{course.id}} name: {{course.name}} credit: {{course.credit}} </p>
            <p>lecturers:
                <ul>
                    <li v-for="lecturer in course.lecturers">
                        {{ lecturer.name.firstname }} {{ lecturer.name.lastname }}
                    </li>
                </ul>
            </p>
        </li>
    </ul>
</div>
</template>
 
<style>

</style>