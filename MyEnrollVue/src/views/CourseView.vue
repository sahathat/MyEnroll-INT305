<script setup>
import CourseList from '../components/course/CourseList.vue';
import { ref, onMounted } from "vue"
import db from '../firebase/init.js'
import { query, collection, getDocs, getCountFromServer, where, doc, deleteDoc, orderBy } from 'firebase/firestore'
import CourseInput from '../components/course/CourseInput.vue';

const courses = ref([])
const count = ref(0)
const lecturers = ref([])

async function getCourse() {
    courses.value = []
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

async function getLecturer() {
    const lecturerRef = collection(db, "lecturers")
    const lecturerSnapshot = await getDocs(query(lecturerRef, orderBy("email")))
    lecturerSnapshot.forEach(doc => {
      const data = doc.data()
      data.id = doc.id
      lecturers.value.push(data)
    })
}

async function deleteCourse(id) {
  await(deleteDoc(doc(db,"courses",id)))
}

onMounted(() => {
    getCourse()
    getLecturer()
})

</script>

<template>
  <div>
    <CourseInput @createCourse="getCourse" :lecturerList="lecturers"></CourseInput>
    <CourseList :courses="courses" :count="count" @deleteCourse="deleteCourse"></CourseList>
  </div>
</template>

<style>
</style>
