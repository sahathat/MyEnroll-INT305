<script setup>
import { ref } from 'vue'
import { collection, addDoc } from 'firebase/firestore'
import db from '../../firebase/init.js'

const course = ref({})

const props = defineProps({
    courses: {
        type: Array,
        required: true
    },
    docId: {
        type: String,
        required: true
    }
})

const emit = defineEmits(['addCourse'])

async function addCourse() {
    const courseEnrollRef = collection(db,"semesters",props.docId,"courseEnrolls")
    await addDoc(courseEnrollRef,{
        code: course.value.id,
        name: course.value.name,
        credit: course.value.credit,
        isEnroll: false
    })
    emit('addCourse')
}

</script>
 
<template>
<div>
    <form @submit.prevent="addCourse">
        <select v-model="course" required>
            <option v-for="item in courses" :key="item.id" :value="item">{{item.id}}</option>
        </select>
        <button class="button" type="submit">Add</button>
    </form>
</div>
</template>
 
<style scoped>
.button {
    background-color: green;
    border-color: green;
    color: white;
    margin: 10px;
}
</style>