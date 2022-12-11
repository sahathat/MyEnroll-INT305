<script setup>
import LecturerList from '../components/lecturer/LecturerList.vue';
import { ref, onMounted } from "vue"
import db from '../firebase/init.js'
import { query, collection, onSnapshot, getCountFromServer, orderBy } from 'firebase/firestore'

const lecturers = ref([])
const count = ref(0)

async function getLecturer() {
    const lecturerRef = collection(db, "lecturers")
    await onSnapshot(query(lecturerRef, orderBy("hiredate","desc")), docSnapshot => {
        const lecModel = []
        docSnapshot.forEach((doc) => {
            const data = doc.data()
            data.id = doc.id
            lecModel.push(data)
            lecturers.value = [...lecModel]
        })
    })

    const countFromServer = await getCountFromServer(query(lecturerRef))
    count.value = countFromServer.data().count
}

onMounted(() => {
    getLecturer()
})

</script>
 
<template>
<div>
    <LecturerList :lecturers="lecturers" :count="count"></LecturerList>
</div>
</template>
 
<style>

</style>