<script setup>
import { onMounted, reactive, ref } from "vue";
import "animate.css";

let src = ref("");
let videos = reactive({ videos: [] });
let animation = ref("animatefadeIn");

onMounted(() => {
  let api_url = "../../db.json";
  fetch(api_url)
    .then((response) => response.json())
    .then((data) => {
      videos.videos = data.data.videos;
      src.value = videos.videos[0].video;
    });
});

let index = ref(0);

const nextvideo = () => {
  index.value++;
  animation.value = "animatefadeOut";
  setTimeout(() => {
    animation.value = "animatefadeIn";
  }, 500);
  src.value = videos.videos[index.value].video;
};
</script>

<template>
  <div>
    <div class="videoplayer">
      <div class="controls">
        <a @click="nextvideo" href="#" class="controlsnext">➜</a>
      </div>
      <video
        :class="animation"
        class="animate__animated"
        id="video"
        controls
        autoplay
        :src="src"
        muted
      ></video>
    </div>
  </div>
</template>

<style scoped>
.controls {
  position: absolute;
  left: 450px;
  top: 40%;
  font-size: 5rem;
  z-index: 2;
}
.controls a {
  color: white !important;
  text-decoration: none !important;
}
video {
  max-width: 100%;
  max-height: 100vh;
}
.videoplayer {
  position: relative;
}
</style>
