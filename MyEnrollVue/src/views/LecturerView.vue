<script setup>
import LecturerList from '../components/LecturerList.vue';
import { ref, onMounted } from "vue"
import db from '../firebase/init.js'
import { query, collection, getDocs } from 'firebase/firestore'
import { RouterLink, RouterView } from 'vue-router';

const lecturers = ref([])

async function getLecturer() {
    const lecturerRef = collection(db, "lecturers")
    console.log(lecturerRef)
    const querySnap = getDocs(query(lecturerRef))
    querySnap.forEach(lecturer => {
        console.log(lecturer.data())
    });
}

onMounted(() => {
    getLecturer()
})

</script>
 
<template>
<div>
    <LecturerList :lecturers="lecturers"></LecturerList>
</div>
</template>
 
<style>

</style>