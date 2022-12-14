<script setup>
import { collection, addDoc } from "firebase/firestore"
import db from "../firebase/init"
import {ref} from "vue"

const newTitle = ref('')

const emit = defineEmits(["update-todos"])

async function addTodos(){
    const docRef = collection(db,"todos")
    await addDoc(docRef, {
        title: newTitle.value,
        completed: false,
        createdAt: new Date()
    })
    newTitle.value = null
    emit('update-todos')
}
</script>
 
<template>
    <input type="text" placeholder="Enter a new task" v-model="newTitle">
    <button @click="addTodos">ADD</button>
</template>
 
<style>

</style>