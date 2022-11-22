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
  <div class="comments">
    <h2>Comments</h2>
    <div class="comments__section">
      <div v-for="comment in comments.comments" :key="comment.id">
        <h3>{{ comment.user }}</h3>
        <p>{{ comment.text }}</p>
      </div>
    </div>
    <div class="comments__input">
      <input type="text" v-model="comment" />
      <button @click="addComment">Add Comment</button>
    </div>
  </div>
</template>

<style scoped>
.comments {
  width: 80%;
}
.comments__section {
  max-height: 60vh;
  overflow-y: scroll;
  margin-bottom: 2rem;
}

.comments__section div {
  border: 1px solid black;
  padding: 1rem;
  margin-bottom: 1rem;
}

.comments__input {
  width: 100%;
  display: flex;
}

.comments__input input {
  width: 100%;
  padding: 1rem;
  font-size: 1.2rem;
}

.comments__input button {
  padding: 1rem;
  font-size: 1.2rem;
}
</style>
