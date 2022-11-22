<script setup>
import VideoPlayer from "./components/VideoPlayer.vue";
import VideoDetails from "./components/VideoDetails.vue";
import Commments from "./components/Comments.vue";
</script>

<template>
  <div class="layout">
    <div>
      <VideoPlayer />
    </div>
    <div>
      <VideoDetails />
      <Commments />
    </div>
  </div>
</template>

<style scoped></style>
