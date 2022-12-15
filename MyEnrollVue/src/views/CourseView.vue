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
const numberPerPage = ref(3)

async function getCourse() {
    courses.value = []
    const courseRef = collection(db, "courses")
    const courseSnapshot = await getDocs(query(courseRef, limit(numberPerPage.value)))
    courseSnapshot.forEach(async (doc) => {
      const data = doc.data()
      data.id = doc.id
      data.lecturers = await getLecturerFromEmail(data.lecturers)
      courses.value.push(data)
    })
    const countFromServer = await getCountFromServer(query(courseRef), limit(numberPerPage.value))
    count.value = countFromServer.data().count
    getPage()
}

async function getCourseOnPage(page) {
  courses.value = []
  const courseRef = collection(db, "courses")
  const courseAllSnapshot = await getDocs(query(courseRef))
  const lastVisible = courseAllSnapshot.docs[(page-1)*numberPerPage.value]
  const courseSnapshot = await getDocs(query(courseRef, limit(numberPerPage.value), startAt(lastVisible)))
  courseSnapshot.forEach(async (doc) => {
    const data = doc.data()
    data.id = doc.id
    data.lecturers = await getLecturerFromEmail(data.lecturers)
    courses.value.push(data)
  })
  const countFromServer = await getCountFromServer(query(courseRef), limit(numberPerPage.value))
  count.value = countFromServer.data().count
}

async function getPage() {
  pages.value = []
  const countCourseAll = await getCountFromServer(query(collection(db, "courses")))
  for(let i = 0; i < Math.ceil((countCourseAll.data().count/numberPerPage.value)) ; i++){
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
})

</script>

<template>
  <div class="div">
    <CourseInput class="input" @createCourse="getCourse" :lecturerList="lecturers"></CourseInput>
    <CourseList class="list" :courses="courses" :count="count" @deleteCourse="deleteCourse" :pages="pages" @getCourseOnPage="getCourseOnPage"></CourseList>
  </div>
</template>

<style scoped>
.div {
  display: flex;
  justify-content: center;
}

.input {
  margin: 20px;
}

.list {
  margin: 20px;
}
</style>
