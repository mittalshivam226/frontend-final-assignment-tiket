<script setup>
import { useRouter } from "vue-router";
import { useTodoStore } from "../store/todo-store.js";

const props = defineProps({
    todo: Object,
});

const router = useRouter();
const todoStore = useTodoStore();

function navigateToDetails() {
    todoStore.setCurrentDisplayedTodo(props.todo);
    router.push(`/tododetails/${props.todo.id}`);
}
</script>

<template>
    <div class="todo-card" @click="navigateToDetails">
        <span>{{ todo.title }}</span>
        <span class="status-text">{{ todo.completed ? "Completed" : "Pending" }}</span>
    </div>
</template>

<style scoped>
.todo-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    margin: 8px 0;
    cursor: pointer;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 700px;
}

.todo-card:hover {
    background: #f5f5f5;
}

.status-text {
    font-size: 0.85rem;
    color: #666;
    white-space: nowrap;
    margin-left: 12px;
}
</style>