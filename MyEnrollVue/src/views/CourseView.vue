<script setup>
import CourseList from '../components/course/CourseList.vue';
import { ref, onMounted } from "vue"
import db from '../firebase/init.js'
import { query, collection, getDocs, getCountFromServer, where } from 'firebase/firestore'

const courses = ref([])
const count = ref(0)

async function getCourse() {
    const courseRef = collection(db, "courses")
    const courseSnapshot = await getDocs(query(courseRef))
    courseSnapshot.forEach(async (doc) => {
      const data = doc.data()
      data.id = doc.id
      data.lecturers = await getLecturerFromEmail(data.lecturers)
      courses.value.push(data)
    })
    const countFromServer = await getCountFromServer(query(courseRef))
    count.value = countFromServer.data().count
}

async function getLecturerFromEmail(lecturers) {
    const lecModel = [] 
    const lecturerRef = collection(db, "lecturers")
    const lecturerSnapshot = await getDocs(query(lecturerRef, where("email","in",lecturers)))
    lecturerSnapshot.forEach(doc => {
      const data = doc.data()
      data.id = doc.id
      lecModel.push(data)
    })
    return lecModel
}

onMounted(() => {
    getCourse()
})

</script>

<template>
  <div>
    <CourseList :courses="courses" :count="count"></CourseList>
  </div>
</template>

<style>
</style>
