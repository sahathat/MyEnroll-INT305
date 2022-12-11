<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from "vue-router"
import { collection, query, where, getDocs, getCountFromServer } from "firebase/firestore"
import db from "../firebase/init.js"
import PostItem from "../components/PostItem.vue"

const user = ref("")
const posts = ref([])
const count = ref(0)
const countComment = ref(0)
const route = useRoute() 

async function getPosts(){
  user.value = route.params.user
  posts.value = []
  /*  add your code here */
  const postQry = query(collection(db, "posts"),where("user","==", user.value))
  const postSnapshot = await getDocs(postQry)
  postSnapshot.forEach(async (doc) => {
      let postData = doc.data()
      postData.id = doc.id
      postData.comments = await getComments(doc)
      postData.commentCount = countComment.value
      posts.value.push(postData)
    });
  count.value = await getCount(postQry)
}
  
async function getComments(postDoc) {
  const commentList = []
  const commentQry = query(collection(db, "posts", postDoc.id, "comments"))
  const commentSnapshot = await getDocs(commentQry)
  commentSnapshot.forEach((doc) => {
    let commentData = doc.data()
    commentData.id = doc.id
    commentList.push(commentData)
  })
  countComment.value = await getCount(commentQry)

  return commentList
}

async function getCount(qry) {
  const snapshot = await getCountFromServer(qry)
  return snapshot.data().count
}
watch(() => route.params.user, getPosts)

onMounted(() => {
  getPosts() 
})

</script>

<template>
    <h3>Posts : {{user}} ({{count}})</h3>
    <PostItem v-for="post in posts" :post="post" :key="post.id" @update-comment="getPosts"/>
</template>

<style scoped>

</style>

