<script setup>
import { onMounted, reactive } from "vue";

let api_url = "https://lab5-p379.onrender.com/api/v1/messages/";
let comments = reactive({ comments: [] });

onMounted(() => {
  fetch(api_url)
    .then((response) => response.json())
    .then((data) => {
      comments.comments = data;
    });
});
</script>

<template>
  <div>
    <h2>Comments</h2>
    <div v-for="comment in comments.comments" :key="comment.id">
      <h3>{{ comment.user }}</h3>
      <p>{{ comment.text }}</p>
    </div>
  </div>
</template>

<style scoped></style>
