<script setup>
import { onMounted, ref } from "vue";

let username = ref("");
let description = ref("");

onMounted(() => {
  let api_url = "../../db.json";
  fetch(api_url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      username.value = data.data.videos[0].username;
      description.value = data.data.videos[0].description;
    });
});
</script>

<template>
  <div class="video__details">
    <h2>{{ username }}</h2>
    <p>{{ description }}</p>
  </div>
</template>

<style scoped>
.video__details {
  padding: 1em;
}
</style>
