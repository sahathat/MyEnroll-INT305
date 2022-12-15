<script setup>
import { useRoute, useRouter } from "vue-router"
import { ref, onMounted } from "vue"
import db from '../firebase/init.js'
import { query, doc, getDoc, getDocs, collection, updateDoc, deleteDoc } from 'firebase/firestore'
import CourseListEnroll from "../components/semester/CourseListEnroll.vue";

const id = ref("")
const semester = ref({})
const courses = ref([])
const route = useRoute()
const router = useRouter()
const totalCredit = ref(0)

async function getSemester() {
    id.value = route.params.id
    courses.value = []
    const semesterRef = doc(db, "semesters", id.value)
    const semesterSnapshot = await getDoc(semesterRef)
    semester.value = semesterSnapshot.data()
    courses.value = await getCourseFromSemester(id.value)
}

async function getCourseFromSemester(docId) {
    const courseEnrollRef = collection(db, "semesters", docId, "courseEnrolls")
    const courseEnrollSnapshot = await getDocs(query(courseEnrollRef))
    const courseInSemester = []
    courseEnrollSnapshot.forEach(async (docRef)=> {
        const data = docRef.data()
        data.id = docRef.id
        totalCredit.value += data.credit
        courseInSemester.push(data)
    })
    return courseInSemester
}

async function isEnroll(course) {
    const docRef = doc(db, "semesters", id.value, "courseEnrolls", course.id)
    await updateDoc(docRef, { isEnroll: course.isEnroll ? false : true})
    totalCredit.value = 0
    courses.value = await getCourseFromSemester(id.value)
}

async function deleteEnroll(course) {
    const docRef = doc(db, "semesters", id.value, "courseEnrolls", course.id)
    await deleteDoc(docRef)
    totalCredit.value = 0
    courses.value = await getCourseFromSemester(id.value)
}

const goHome = () => router.push({path: "/"})

onMounted(()=>{
    getSemester()
})

</script>
 
<template>
<div>
    <h1>Term: {{semester.term}}/{{semester.year}}</h1>
    <CourseListEnroll :courses="courses" @enrollCourse="isEnroll" @deleteEnroll="deleteEnroll"/>
    <h3>total credit : {{totalCredit}}</h3>
    <button @click="goHome">back</button>
</div>
</template>
 
<style>

</style>