<script setup>
import CourseList from '../components/course/CourseList.vue';
import { ref, onMounted } from "vue"
import db from '../firebase/init.js'
import { query, collection, getDocs, getCountFromServer, where, doc, deleteDoc, orderBy, limit, startAt } from 'firebase/firestore'
import CourseInput from '../components/course/CourseInput.vue';

const courses = ref([])
const count = ref(0)
const lecturers = ref([])
const pages = ref([])

async function getCourse() {
    courses.value = []
    const courseRef = collection(db, "courses")
    const courseSnapshot = await getDocs(query(courseRef, limit(6)))
    courseSnapshot.forEach(async (doc) => {
      const data = doc.data()
      data.id = doc.id
      data.lecturers = await getLecturerFromEmail(data.lecturers)
      courses.value.push(data)
    })
    const countFromServer = await getCountFromServer(query(courseRef), limit(6))
    count.value = countFromServer.data().count
}

async function getCourseOnPage(page) {
  courses.value = []
  const courseRef = collection(db, "courses")
  const courseAllSnapshot = await getDocs(query(courseRef))
  const lastVisible = courseAllSnapshot.docs[(page-1)*6]
  const courseSnapshot = await getDocs(query(courseRef, limit(6), startAt(lastVisible)))
  courseSnapshot.forEach(async (doc) => {
    const data = doc.data()
    data.id = doc.id
    data.lecturers = await getLecturerFromEmail(data.lecturers)
    courses.value.push(data)
  })
  const countFromServer = await getCountFromServer(query(courseRef), limit(6))
  count.value = countFromServer.data().count
}

async function getPage() {
  const countCourseAll = await getCountFromServer(query(collection(db, "courses")))
  for(let i = 0; i < Math.floor((countCourseAll.data().count/6)+1) ; i++){
    pages.value.push(i + 1)
  }
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
  await deleteDoc(doc(db,"courses",id))
  await getCourse()
}

onMounted(() => {
    getCourse()
    getLecturer()
    getPage()
})

</script>

<template>
  <div>
    <CourseInput @createCourse="getCourse" :lecturerList="lecturers"></CourseInput>
    <CourseList :courses="courses" :count="count" @deleteCourse="deleteCourse" :pages="pages" @getCourseOnPage="getCourseOnPage"></CourseList>
  </div>
</template>

<style>
</style>
