<script>
import InputFirebase from './components/InputFirebase.vue';
import ListFirebase from './components/ListFirebase.vue';

import { doc, getDocs, query, collection , updateDoc, deleteDoc} from "firebase/firestore"
import db from "./firebase/init"

export default {
    components: {
      InputFirebase, ListFirebase
    },
    created() {
        this.getTodos()
    },
    data() {
        return {
            todos: []
        };
    },
    methods: {
        async getTodos(){
            this.todos = []
            const querySnap = await getDocs(query(collection(db,"todos")))
            querySnap.forEach(doc => {
                let data = doc.data()
                data.id = doc.id
                this.todos.push(data)
            })
        },
        async toggleCompleted(todo){
            let docRef = doc(db,"todos",todo.id)
            await updateDoc(docRef, {completed: todo.completed ? false : true})
            await this.getTodos()
        },
        async deleteTodo(todo){
            let docRef = doc(db,"todos",todo.id)
            await deleteDoc(docRef)
            await this.getTodos()
        }
    }
}
</script>

<template>
  <div>
    <h1>This is my list</h1>
    <InputFirebase @update-todos="getTodos"/>
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
