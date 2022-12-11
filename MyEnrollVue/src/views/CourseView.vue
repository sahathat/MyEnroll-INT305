<script setup>
import CourseList from '../components/course/CourseList.vue';
import { ref, onMounted } from "vue"
import db from '../firebase/init.js'
import { query, collection, getDocs, getCountFromServer, where, doc, setDoc, updateDoc, deleteDoc, orderBy } from 'firebase/firestore'
import CourseInput from '../components/course/CourseInput.vue';

const courses = ref([])
const count = ref(0)
const currentCourse = ref({});
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

async function createCourse(newCourse) {
  console.log(newCourse)
  const newCourseEmail = []
  newCourse.lecturers.forEach(lecturer => {
    newCourseEmail.push(lecturer.email)
  })
  await(setDoc(doc(db,"courses",newCourse.id), {
    name: newCourse.name,
    credit: newCourse.credit,
    lecturers: newCourseEmail,
    createdOn: new Date(),
    updatedOn: new Date()
  }))
  currentCourse.value = {}
  await getCourse()
}

function editCourse(updatedCourse) {
  console.log(updatedCourse)
  currentCourse.value = updatedCourse
}

async function updateCourse(course) {
  await(updateDoc(doc(db,"courses",course.id),{"credit":course.credit,"lecturers":course.lecturers}))
  currentCourse.value = {}
  await getCourse()
}

async function deleteCourse(id) {
  await(deleteDoc(doc(db,"courses",id)))
  currentCourse.value = {}
  await getCourse()
}

onMounted(() => {
    getCourse()
    getLecturer()
})

</script>

<template>
  <div>
    <CourseInput :currentCourse="currentCourse" @updateCourse="updateCourse" @createCourse="createCourse" :lecturerList="lecturers"></CourseInput>
    <CourseList :courses="courses" :count="count" @editCourse="editCourse" @deleteCourse="deleteCourse"></CourseList>
  </div>
</template>

<style>
</style>
