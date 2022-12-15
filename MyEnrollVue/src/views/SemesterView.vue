<script setup>
import SemesterList from '../components/semester/SemesterList.vue';
import { ref, onMounted } from "vue"
import db from '../firebase/init.js'
import { query, collection, getDocs, orderBy } from 'firebase/firestore'

const semesters = ref([])

async function getSemester() {
    semesters.value = []
    const semesterRef = collection(db, "semesters")
    const semesterSnapshot = await getDocs(query(semesterRef, orderBy("year","desc"), orderBy("term","desc")))
    semesterSnapshot.forEach(async (doc) => {
      const data = doc.data()
      data.id = doc.id
      semesters.value.push(data)
    })
}

onMounted(() => {
    getSemester()
})

</script>
 
<template>
<div>
    <SemesterList :semesters="semesters"></SemesterList>
</div>
</template>
 
<style>

</style>
