<script setup>

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
    <ul v-for="course in courses" :key="course.id">
        <li>
            <p :class="{ isEnroll: course.isEnroll }">code: {{course.code}} name: {{course.name}} credit: {{course.credit}} </p>
            <button class="enroll" @click="$emit('enrollCourse', course)">Enroll</button> <button class="delete" @click="$emit('deleteEnroll', course)">Delete</button>
        </li>
    </ul>
</div>
</template>
 
<style>
.isEnroll {
    color: red;
    text-decoration: line-through;
}

.enroll {
    background-color: blue;
    border-color: blue;
    color: white;
    margin: 10px;
}

.delete {
    background-color: red;
    border-color: red;
    color: white;
    margin: 10px;
}
</style>