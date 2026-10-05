<script setup>
import { useRouter } from "vue-router";
import { usePostStore } from "../store/post-store.js";

const props = defineProps({
  post: Object,
});

const router = useRouter();
const postStore = usePostStore();

function navigateToDetails() {
  postStore.setCurrentDisplayedPost(props.post);
  router.push(`/postdetails/${props.post.id}`);
}
</script>

<template>
  <div class="post-card" @click="navigateToDetails">
    <h4>{{ post.title }}</h4>
    <p>{{ post.body }}</p>
  </div>
</template>

<style scoped>
.post-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 8px 0;
  cursor: pointer;
  background: #f4fbf7;
  max-width: 700px;
}

.post-card:hover {
  background: #e8f5e9;
}

.post-card h4 {
  margin: 0 0 8px 0;
}

.post-card p {
  margin: 0;
  color: #555;
  font-size: 0.9rem;
}
</style>