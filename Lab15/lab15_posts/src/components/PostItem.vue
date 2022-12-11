<script setup>
import CommentItem from "../components/CommentItem.vue"
import { collection, addDoc, getDocs, query } from "firebase/firestore"
import db from "../firebase/init.js"
import {ref} from "vue"

const props = defineProps({
  post: {
    type: Object,
    required: true,
  }
});

const newComment = ref({})

async function addComment(post) {
  const commentRef = collection(db, "posts", post.id, "comments")
  await addDoc(commentRef, {
    comment: newComment.value.comment,
    name: newComment.value.name,
    stars: newComment.value.stars,
    cmtdate: new Date()
  })
  newComment.value = {}

  post.comments = []
  const commentSnapshot = await getDocs(query(commentRef))
  commentSnapshot.forEach((doc) => {
    let commentData = doc.data()
    commentData.id = doc.id
    post.comments.push(commentData)
  })
}

defineEmits(["update-comment"])
</script>

<template>
  <div class="box">
    {{post.body}}
    <h4 class="title">comments ({{post.commentCount}})</h4>
    <div>
      Name: <input type="text" v-model="newComment.name"/> <br>
      Stars: <select v-model="newComment.stars">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
      </select> <br>
      Comment: <br><textarea v-model="newComment.comment"></textarea> <br>
      <button @click="addComment(post)">send</button>
    </div>
    <CommentItem v-for="comment in post.comments" :comment="comment" :key="comment.id" />
  </div>
</template>

<style scoped>
  .box {
    border: 1px solid grey;
    padding: 5px ;
    margin:  5px ;
    border-radius: 5px ;
  }
  .title {
    font-style: italic ;
    color: hsla(160, 100%, 37%, 1);
  }
</style>


