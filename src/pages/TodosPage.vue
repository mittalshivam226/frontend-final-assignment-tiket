<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "../store/user-store.js";
import { useTodoStore } from "../store/todo-store.js";
import { storeToRefs } from "pinia";
import SearchComponent from "../components/SearchComponent.vue";
import TodoCardComponent from "../components/TodoCardComponent.vue";
import UserFilterComponent from "../components/UserFilterComponent.vue";
import { usePagination } from "../composables/usePagination.js";

const route = useRoute();
const router = useRouter();

const userStore = useUserStore();
const { fetchUserData } = userStore;
const { userData } = storeToRefs(userStore);

const todoStore = useTodoStore();
const { fetchTodoData } = todoStore;
const { todoData } = storeToRefs(todoStore);

// Only fetch if not already loaded
if (userData.value.length === 0) fetchUserData();
if (todoData.value.length === 0) fetchTodoData();

const searchQuery = ref(route.query.search || "");

const selectedUserIds = ref(
    route.query.userId
        ? route.query.userId.split(",").map(Number)
        : []
);

const filteredTodos = computed(() => {
    let todos = todoData.value;
    if (searchQuery.value) {
        const q = searchQuery.value.toLowerCase();
        todos = todos.filter((t) => t.title.toLowerCase().includes(q));
    }
    if (selectedUserIds.value.length > 0) {
        todos = todos.filter((t) => selectedUserIds.value.includes(t.userId));
    }
    return todos;
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
    usePagination(filteredTodos, 10);
</script>

<template>
    <h1>Todos</h1>

    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
        <SearchComponent :searchHint="'Search by task...'" :initialValue="searchQuery" @handleSearch="handleSearch" />
        <UserFilterComponent :users="userData" :selectedIds="selectedUserIds"
            @update:selectedIds="handleFilterChange" />
    </div>

    <br />

    <TodoCardComponent v-for="todo in paginatedItems" :key="todo.id" :todo="todo" />

    <div v-if="todoData.length === 0">Loading todos...</div>

    <br />
    <div v-if="totalPages > 1">
        <button @click="changePage('prev')" :disabled="currentPage <= 1">Prev</button>
        &nbsp; Page {{ currentPage }} of {{ totalPages }} &nbsp;
        <button @click="changePage('next')" :disabled="currentPage >= totalPages">Next</button>
    </div>
</template>

<style scoped></style>