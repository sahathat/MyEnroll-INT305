<script setup>
import LecturerList from '../components/lecturer/LecturerList.vue';
import { ref, onMounted } from "vue"
import db from '../firebase/init.js'
import { query, collection, onSnapshot, getCountFromServer, orderBy } from 'firebase/firestore'

const lecturers = ref([])
const count = ref(0)
const sort = ref("hiredate")

async function getLecturer() {
    const lecturerRef = collection(db, "lecturers")
    if(sort.value == "hiredate") {
        await onSnapshot(query(lecturerRef, orderBy("hiredate","desc")), docSnapshot => {
            const lecModel = []
            docSnapshot.forEach((doc) => {
            const data = doc.data()
            data.id = doc.id
            lecModel.push(data)
            lecturers.value = [...lecModel]
            })
        })
    } else {
        await onSnapshot(query(lecturerRef, orderBy(sort.value)), docSnapshot => {
            const lecModel = []
            docSnapshot.forEach((doc) => {
            const data = doc.data()
            data.id = doc.id
            lecModel.push(data)
            lecturers.value = [...lecModel]
            })
        })
    }
    const countFromServer = await getCountFromServer(query(lecturerRef))
    count.value = countFromServer.data().count
}

onMounted(() => {
    getLecturer()
})

</script>
 
<template>
<div>
    <h3>Lecturer List ({{ count }})</h3>
    <select v-model="sort" @click="getLecturer()">
        <option>name</option>
        <option>email</option>
        <option>hiredate</option>
    </select>
    <LecturerList :lecturers="lecturers"></LecturerList>
</div>
</template>
 
<style scoped>
button {
    margin: 20px;
}
</style>