<script>
import { collection, addDoc } from "firebase/firestore"
import db from "../firebase/init"

export default {
    name: "InputFirebase",
    data() {
        return {
            newTitle: null,
        };
    },
    emits: ["update-todos"],
    methods: {
        async addTodos(){
            const docRef = collection(db,"todos")
            await addDoc(docRef, {
                title: this.newTitle,
                completed: false,
                createdAt: new Date()
            })
            this.newTitle = null
            this.$emit('update-todos')
        }
    }
}
</script>
 
<template>
    <input type="text" placeholder="Enter a new task" v-model="newTitle">
    <button @click="addTodos">ADD</button>
</template>
 
<style>

</style>