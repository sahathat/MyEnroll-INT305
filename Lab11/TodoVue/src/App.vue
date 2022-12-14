<script setup>
import InputFirebase from './components/InputFirebase.vue';
import ListFirebase from './components/ListFirebase.vue';

import { doc, query, collection , updateDoc, deleteDoc, onSnapshot} from "firebase/firestore"
import db from "./firebase/init"
import {ref, onMounted } from "vue"

const todos = ref([])

async function getSnapshot(){
  await onSnapshot(query(collection(db,"todos")), (snap)=> {
    todos.value = []
      snap.forEach( (doc) => {
        let data = doc.data()
        data.id = doc.id 
        todos.value.push(data) ;
    })
  })
}

async function toggleCompleted(todo){
  let docRef = doc(db,"todos",todo.id)
  await updateDoc(docRef, {completed: todo.completed ? false : true})
}

async function deleteTodo(todo){
  let docRef = doc(db,"todos",todo.id)
  await deleteDoc(docRef)
}

onMounted(()=>{
  getSnapshot()
})
</script>

<template>
  <div>
    <h1>This is my list</h1>
    <InputFirebase @update-todos="getSnapshot"/>
    <ListFirebase :todos="todos" @toggle-completed="toggleCompleted" @delete-todo="deleteTodo"/>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 2em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
