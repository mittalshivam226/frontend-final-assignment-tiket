<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "../store/user-store.js";
import { storeToRefs } from "pinia";
import SearchComponent from "../components/SearchComponent.vue";
import UserCardComponent from "../components/UserCardComponent.vue";

const route = useRoute();
const router = useRouter();

const userStore = useUserStore();
const { fetchUserData } = userStore;
const { userData } = storeToRefs(userStore);

if (userData.value.length === 0) fetchUserData();

const searchQuery = ref(route.query.search || "");

const filteredUsers = computed(() => {
    if (!searchQuery.value) return userData.value;
    const q = searchQuery.value.toLowerCase();
    return userData.value.filter((user) =>
        user.name.toLowerCase().includes(q)
    );
});

function handleSearch(text) {
    searchQuery.value = text;
    router.push({
        query: {
            ...route.query,
            search: text || undefined,
        },
    });
}
</script>

<template>
    <h1>Users</h1>
    <SearchComponent :searchHint="'Search by name...'" :initialValue="searchQuery" @handleSearch="handleSearch" />
    <br />

    <UserCardComponent v-for="user in filteredUsers" :key="user.id" :user="user" />

    <div v-if="userData.length === 0">Loading users...</div>
</template>

<style scoped></style>
