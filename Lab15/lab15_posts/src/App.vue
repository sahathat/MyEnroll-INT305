<script setup>
import { RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'
import { query, collection, onSnapshot } from 'firebase/firestore'
import db from './firebase/init.js'
import UserList from './components/UserList.vue'

const users = ref([])

async function getUsers(){
    /*  add your code here */
    users.value = []
    const userQry = query(collection(db, "users"))
    await onSnapshot(userQry, (userSnapshot) => {
      const userModel = []
      userSnapshot.forEach((doc) => {
       let data = doc.data()
       data.id = doc.id
       userModel.push(data)
       users.value = [...userModel]
    });
  })
}

onMounted(() => {
    getUsers() 
})
</script>

<template>
  <div>
    <div>
      <UserList :users="users" />
    </div>
  </div>
  <div class="content">
    <RouterView />
  </div>
</template>

<style scoped>

</style>

