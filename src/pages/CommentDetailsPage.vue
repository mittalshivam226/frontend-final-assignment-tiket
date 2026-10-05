<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCommentStore } from "../store/comment-store.js";
import { usePostStore } from "../store/post-store.js";
import { storeToRefs } from "pinia";

const route = useRoute();
const router = useRouter();

const commentStore = useCommentStore();
const { fetchCommentData } = commentStore;
const { commentData } = storeToRefs(commentStore);

const postStore = usePostStore();
const { fetchPostData, setCurrentDisplayedPost } = postStore;
const { postData } = storeToRefs(postStore);

if (commentData.value.length === 0) fetchCommentData();
if (postData.value.length === 0) fetchPostData();

const commentId = computed(() => parseInt(route.params.id));

const currentComment = computed(() =>
    commentData.value.find((c) => c.id === commentId.value) || null
);

const commentPost = computed(() => {
    if (!currentComment.value) return null;
    return postData.value.find((p) => p.id === currentComment.value.postId) || null;
});

function navigateToPost() {
    if (commentPost.value) {
        setCurrentDisplayedPost(commentPost.value);
        router.push(`/postdetails/${commentPost.value.id}`);
    }
}
</script>

<template>
    <div v-if="currentComment">
        <h1>{{ currentComment.name }}</h1>
        <p><strong>Email:</strong> {{ currentComment.email }}</p>
        <p>{{ currentComment.body }}</p>
        <hr />
        <div v-if="commentPost">
            <strong>On Post: </strong>
            <a href="#" @click.prevent="navigateToPost">{{ commentPost.title }}</a>
        </div>
    </div>
    <div v-else>
        <p>Loading comment...</p>
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