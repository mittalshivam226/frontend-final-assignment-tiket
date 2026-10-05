<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCommentStore } from "../store/comment-store.js";
import { storeToRefs } from "pinia";
import CommentCardComponent from "../components/CommentCardComponent.vue";
import { usePagination } from "../composables/usePagination.js";

const route = useRoute();

const commentStore = useCommentStore();
const { fetchCommentData } = commentStore;
const { commentData } = storeToRefs(commentStore);

if (commentData.value.length === 0) fetchCommentData();

const { currentPage, totalPages, paginatedItems, changePage } =
    usePagination(commentData, 10);
</script>

<template>
    <h1>Comments</h1>

    <CommentCardComponent v-for="comment in paginatedItems" :key="comment.id" :comment="comment" />

    <div v-if="commentData.length === 0">Loading comments...</div>

    <br />
    <div v-if="totalPages > 1">
        <button @click="changePage('prev')" :disabled="currentPage <= 1">Prev</button>
        &nbsp; Page {{ currentPage }} of {{ totalPages }} &nbsp;
        <button @click="changePage('next')" :disabled="currentPage >= totalPages">Next</button>
    </div>
</template>

<style scoped></style>