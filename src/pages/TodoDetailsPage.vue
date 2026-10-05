<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "../store/user-store.js";
import { useTodoStore } from "../store/todo-store.js";
import { storeToRefs } from "pinia";

const route = useRoute();
const router = useRouter();

const userStore = useUserStore();
const { fetchUserData, setCurrentDisplayedUser } = userStore;
const { userData } = storeToRefs(userStore);

const todoStore = useTodoStore();
const { fetchTodoData } = todoStore;
const { todoData } = storeToRefs(todoStore);

if (userData.value.length === 0) fetchUserData();
if (todoData.value.length === 0) fetchTodoData();

const todoId = computed(() => parseInt(route.params.id));

const currentTodo = computed(() =>
    todoData.value.find((t) => t.id === todoId.value) || null
);

const todoUser = computed(() => {
    if (!currentTodo.value) return null;
    return userData.value.find((u) => u.id === currentTodo.value.userId) || null;
});

function navigateToUser() {
    if (todoUser.value) {
        setCurrentDisplayedUser(todoUser.value);
        router.push(`/userdetails/${todoUser.value.id}`);
    }
}
</script>

<template>
    <div v-if="currentTodo">
        <h1>{{ currentTodo.title }}</h1>
        <p>
            Status:
            <strong>{{ currentTodo.completed ? "Completed" : "Pending" }}</strong>
        </p>
        <hr />
        <div v-if="todoUser">
            <strong>Assigned to: </strong>
            <a href="#" @click.prevent="navigateToUser">{{ todoUser.name }}</a>
        </div>
    </div>
    <div v-else>
        <p>Loading todo...</p>
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