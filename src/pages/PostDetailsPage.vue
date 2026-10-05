<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "../store/user-store.js";
import { usePostStore } from "../store/post-store.js";
import { storeToRefs } from "pinia";

const route = useRoute();
const router = useRouter();

const userStore = useUserStore();
const { fetchUserData, setCurrentDisplayedUser } = userStore;
const { userData } = storeToRefs(userStore);

const postStore = usePostStore();
const { fetchPostData } = postStore;
const { postData } = storeToRefs(postStore);

if (userData.value.length === 0) fetchUserData();
if (postData.value.length === 0) fetchPostData();

const postId = computed(() => parseInt(route.params.id));

const currentPost = computed(() =>
    postData.value.find((p) => p.id === postId.value) || null
);

const postUser = computed(() => {
    if (!currentPost.value) return null;
    return userData.value.find((u) => u.id === currentPost.value.userId) || null;
});

function navigateToUser() {
    if (postUser.value) {
        setCurrentDisplayedUser(postUser.value);
        router.push(`/userdetails/${postUser.value.id}`);
    }
}
</script>

<template>
    <div v-if="currentPost">
        <h1>{{ currentPost.title }}</h1>
        <p>{{ currentPost.body }}</p>
        <hr />
        <div v-if="postUser">
            <strong>Author: </strong>
            <a href="#" @click.prevent="navigateToUser">{{ postUser.name }}</a>
        </div>
    </div>
    <div v-else>
        <p>Loading post...</p>
    </div>
</template>

<style scoped>
h1 {
    margin-bottom: 12px;
}

p {
    color: #444;
    line-height: 1.6;
}

hr {
    margin: 20px 0;
}

a {
    color: #0066cc;
    cursor: pointer;
}

a:hover {
    text-decoration: underline;
}
</style>