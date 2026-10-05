<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "../store/user-store.js";

const props = defineProps({
  user: Object,
});

const router = useRouter();
const userStore = useUserStore();

function navigateToUserDetails() {
  userStore.setCurrentDisplayedUser(props.user);
  router.push(`/userdetails/${props.user.id}`);
}
</script>

<template>
  <div class="user-card" @click="navigateToUserDetails">
    <h3>{{ user.name }}</h3>
    <p>{{ user.email }}</p>
    <p>{{ user.address.street }}, {{ user.address.city }}</p>
  </div>
</template>

<style scoped>
.user-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 8px 0;
  cursor: pointer;
  background: #fff;
}

.user-card:hover {
  background: #f5f5f5;
}

.user-card h3 {
  margin: 0 0 6px 0;
}

.user-card p {
  margin: 2px 0;
  color: #555;
  font-size: 0.9rem;
}
</style>