<script setup>
import { onMounted, reactive, ref } from "vue";

let api_url = "https://lab5-p379.onrender.com/api/v1/messages/";
let comments = reactive({ comments: [] });
let comment = ref("");

onMounted(() => {
  fetch(api_url)
    .then((response) => response.json())
    .then((data) => {
      comments.comments = data;
    });
});

// push comment and username to comments array and post to api
const addComment = () => {
  comments.comments.push({ user: "Alejandro", text: comment.value });
  fetch(api_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: "Alejandro",
      text: comment.value,
    }),
  });
  comment.value = "";
};
</script>

<template>
  <div>
    <h2>Comments</h2>
    <div v-for="comment in comments.comments" :key="comment.id">
      <h3>{{ comment.user }}</h3>
      <p>{{ comment.text }}</p>
    </div>
    <div>
      <input type="text" v-model="comment" />
      <button @click="addComment">Add Comment</button>
    </div>
  </div>
</template>

<style scoped></style>
