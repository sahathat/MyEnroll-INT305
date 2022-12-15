<script setup>

import {ref} from 'vue'
import db from '../../firebase/init.js'
import { doc, setDoc } from 'firebase/firestore'

const id = ref('')
const name = ref('')
const credit = ref('')
const lecturers = ref([])

defineProps({
    lecturerList: {
        type: Array,
        require: true
    }
})

const emit = defineEmits(['createCourse'])

async function createCourse() {
  const newCourseEmail = []
  lecturers.value.forEach(lecturer => {
    newCourseEmail.push(lecturer.email)
  })
  if(newCourseEmail.length == 0){
    newCourseEmail.push("")
  }
  console.log(newCourseEmail)
  await setDoc(doc(db,"courses",id.value), {
    name: name.value,
    credit: credit.value,
    lecturers: newCourseEmail,
    createdOn: new Date(),
    updatedOn: new Date()
  })
  id.value = ''
  name.value = ''
  credit.value = ''
  lecturers.value = []
  emit('createCourse')
}

</script>
 
<template>
<div>
    <h2>Create course:</h2>
    <span>Course id: <input type="text" v-model="id"></span> <br>
    <span>Course name: <input type="text" v-model="name"></span> <br>
    <span>Course credit: <input type="number" step="1" min="1" max="10" v-model="credit"></span> <br>
    <span>Lecturer: <br>
    <span v-for="(lecturer, index) in lecturerList" :key="index">
        <input type="checkbox" :id="lecturer" :value="lecturer" v-model="lecturers">
        <label :for="lecturer"> {{lecturer.email}} </label> <br>

    </span>
    </span>

    <button class="created" @click="createCourse()">
        Create
    </button>
</div>
</template>
 
<style scoped>
.created {
  background-color: green;
    border-color: green;
    color: white;
    margin: 10px;
}
</style>