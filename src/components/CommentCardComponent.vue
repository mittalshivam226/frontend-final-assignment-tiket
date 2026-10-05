<script setup>
import { useRouter } from "vue-router";
import { useCommentStore } from "../store/comment-store.js";

const props = defineProps({
    comment: Object,
});

const router = useRouter();
const commentStore = useCommentStore();

function navigateToDetails() {
    commentStore.setCurrentDisplayedComment(props.comment);
    router.push(`/commentdetails/${props.comment.id}`);
}
</script>

<template>
    <div class="comment-card" @click="navigateToDetails">
        <p class="comment-name">{{ comment.name }}</p>
        <p class="comment-body">{{ comment.body }}</p>
    </div>
</template>

<style scoped>
.comment-card {
    display: block;
    box-sizing: border-box;
    max-width: 700px;
    padding: 16px;
    margin: 8px 0;
    border: 1px solid #000000;
    border-radius: 8px;
    background-color: #91c3d8;
    cursor: pointer;
}

.comment-card:hover {
    background-color: #7ab5ce;
}

.comment-name {
    font-weight: 600;
    margin: 0 0 6px 0;
}

.comment-body {
    margin: 0;
    color: #333;
    font-size: 0.9rem;
}
</style>