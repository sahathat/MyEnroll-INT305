<script setup>
import {computed} from 'vue'
let props = defineProps({
    lecturerList: {
        type: Array,
        require: true
    },
    currentCourse: {
        type: Object,
        default: {}
    }
})

defineEmits(['createCourse','updateCourse'])
let newCourse = computed(()=>{
    return {
        id: props.currentCourse.id,
        name: props.currentCourse.name,
        credit: props.currentCourse.credit,
        lecturers: props.currentCourse.lecturers == undefined ? [""] : props.currentCourse.lecturers,
    }
})
</script>
 
<template>
<div>
    <h2>Create course:</h2>
    <span v-if="newCourse.id == undefined">Course id: <input type="text" v-model="newCourse.id"></span> <br>
    <span v-if="newCourse.id == undefined">Course name: <input type="text" v-model="newCourse.name"></span> <br>
    <span>Course credit: <input type="number" step="1" min="1" max="10" v-model="newCourse.credit"></span> <br>
    <span>Lecturer: 
    <div v-for="(lecturer, index) in lecturerList" :key="index">
        <input type="checkbox" :id="lecturer" :value="lecturer" v-model="newCourse.lecturers">
        <label :for="lecturer"> {{lecturer.email}} </label>
    </div>
    </span> <br>
    {{newCourse.lecturers}}
    <!-- Lecturer: <input type="text" v-model="newCourse.name"> <br> -->
    <button @click="$emit('updateCourse',newCourse)" v-if="newCourse.id != undefined">
        Save
    </button>
    <button @click="$emit('createCourse',newCourse)" v-else>
        Create
    </button>
</div>
</template>
 
<style>
</style>