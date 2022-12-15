<script setup>
import CourseEnroll from './CourseEnroll.vue';

defineProps({
    courses: {
        type: Array,
        required: true
    }
})

const emit = defineEmits(['enrollCourse','deleteEnroll'])
</script>
 
<template>
<div>
    <h3>Course Enroll</h3>
    <CourseEnroll />
    <ul v-for="course in courses" :key="course.id">
        <li>
            <p :class="{ isEnroll: course.isEnroll }">code: {{course.id}} name: {{course.name}} credit: {{course.credit}} </p>
            <button @click="$emit('enrollCourse', course)">Enroll</button> <button @click="$emit('deleteEnroll', course)">Delete</button>
        </li>
    </ul>
</div>
</template>
 
<style>
.isEnroll {
    text-decoration: line-through;
}
</style>