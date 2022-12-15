<script setup>
defineProps({
    courses: {
        type: Array,
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    pages: {
        type: Array,
        required: false
    }
})

const emit = defineEmits(['deleteCourse','getCourseOnPage'])
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
            <button class="delete" @click="$emit('deleteCourse', course.id)">delete</button>
        </li>
    </ul>
    <button class="page" v-for="(i, index) in pages" :key="index" @click="$emit('getCourseOnPage', i)">
      {{i}}
    </button>
</div>
</template>
 
<style scoped>
.page {
    background-color: black;
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