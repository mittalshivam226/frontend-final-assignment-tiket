<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "../store/user-store.js";
import { usePostStore } from "../store/post-store.js";
import { storeToRefs } from "pinia";
import SearchComponent from "../components/SearchComponent.vue";
import PostCardComponent from "../components/PostCardComponent.vue";
import UserFilterComponent from "../components/UserFilterComponent.vue";
import { usePagination } from "../composables/usePagination.js";

const route = useRoute();
const router = useRouter();

const userStore = useUserStore();
const { fetchUserData } = userStore;
const { userData } = storeToRefs(userStore);

const postStore = usePostStore();
const { fetchPostData } = postStore;
const { postData } = storeToRefs(postStore);

if (userData.value.length === 0) fetchUserData();
if (postData.value.length === 0) fetchPostData();

const searchQuery = ref(route.query.search || "");

const selectedUserIds = ref(
    route.query.userId
        ? route.query.userId.split(",").map(Number)
        : []
);

const filteredPosts = computed(() => {
    let posts = postData.value;
    if (searchQuery.value) {
        const q = searchQuery.value.toLowerCase();
        posts = posts.filter((p) => p.title.toLowerCase().includes(q));
    }
    if (selectedUserIds.value.length > 0) {
        posts = posts.filter((p) => selectedUserIds.value.includes(p.userId));
    }
    return posts;
});

function handleSearch(text) {
    searchQuery.value = text;
    router.push({
        query: {
            ...route.query,
            search: text || undefined,
            page: 1,
        },
    });
}

function handleFilterChange(ids) {
    selectedUserIds.value = ids;
    router.push({
        query: {
            ...route.query,
            userId: ids.length > 0 ? ids.join(",") : undefined,
            page: 1,
        },
    });
}

const { currentPage, totalPages, paginatedItems, changePage } =
    usePagination(filteredPosts, 10);
</script>

<template>
    <h1>Posts</h1>

    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
        <SearchComponent :searchHint="'Search by title...'" :initialValue="searchQuery" @handleSearch="handleSearch" />
        <UserFilterComponent :users="userData" :selectedIds="selectedUserIds"
            @update:selectedIds="handleFilterChange" />
    </div>

    <br />

    <PostCardComponent v-for="post in paginatedItems" :key="post.id" :post="post" />

    <div v-if="postData.length === 0">Loading posts...</div>

    <br />
    <div v-if="totalPages > 1">
        <button @click="changePage('prev')" :disabled="currentPage <= 1">Prev</button>
        &nbsp; Page {{ currentPage }} of {{ totalPages }} &nbsp;
        <button @click="changePage('next')" :disabled="currentPage >= totalPages">Next</button>
    </div>
</template>

<style scoped></style>