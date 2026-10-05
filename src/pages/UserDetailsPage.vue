<script setup>
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "../store/user-store.js";
import { usePostStore } from "../store/post-store.js";
import { useTodoStore } from "../store/todo-store.js";
import { storeToRefs } from "pinia";
import PostCardComponent from "../components/PostCardComponent.vue";
import TodoCardComponent from "../components/TodoCardComponent.vue";

const route = useRoute();
const router = useRouter();

const userStore = useUserStore();
const { fetchUserData } = userStore;
const { userData } = storeToRefs(userStore);

const postStore = usePostStore();
const { fetchPostData } = postStore;
const { postData } = storeToRefs(postStore);

const todoStore = useTodoStore();
const { fetchTodoData } = todoStore;
const { todoData } = storeToRefs(todoStore);

if (userData.value.length === 0) fetchUserData();
if (postData.value.length === 0) fetchPostData();
if (todoData.value.length === 0) fetchTodoData();

const userId = computed(() => parseInt(route.params.id));

const currentUser = computed(() =>
    userData.value.find((u) => u.id === userId.value) || null
);

const filteredPostsByUser = computed(() =>
    postData.value.filter((post) => post.userId === userId.value)
);

const filteredTodosByUser = computed(() =>
    todoData.value.filter((todo) => todo.userId === userId.value)
);

const activeTab = ref(route.query.tab || "posts");

function selectTab(tabName) {
    activeTab.value = tabName;
    router.push({ query: { ...route.query, tab: tabName } });
}

watch(
    () => route.query.tab,
    (newTab) => {
        if (newTab) activeTab.value = newTab;
    }
);
</script>

<template>
    <div class="profile-container" v-if="currentUser">
        <div class="user-card-center">
            <h1>{{ currentUser.name }}</h1>
            <p class="email-text">{{ currentUser.email }}</p>
        </div>

        <div class="tab-bar-container">
            <button class="tab-btn" :class="{ active: activeTab === 'posts' }" @click="selectTab('posts')">
                Posts ({{ filteredPostsByUser.length }})
            </button>
            <button class="tab-btn" :class="{ active: activeTab === 'todos' }" @click="selectTab('todos')">
                Todos ({{ filteredTodosByUser.length }})
            </button>
        </div>

        <div class="content-display-area">
            <div v-if="activeTab === 'posts'" class="cards-grid">
                <PostCardComponent v-for="post in filteredPostsByUser" :key="post.id" :post="post" />
                <div v-if="filteredPostsByUser.length === 0" class="empty-state">
                    No posts found for this user.
                </div>
            </div>

            <div v-if="activeTab === 'todos'" class="cards-grid">
                <TodoCardComponent v-for="todo in filteredTodosByUser" :key="todo.id" :todo="todo" />
                <div v-if="filteredTodosByUser.length === 0" class="empty-state">
                    No todos found for this user.
                </div>
            </div>
        </div>
    </div>

    <div v-else>
        <p>Loading user...</p>
    </div>
</template>

<style scoped>
.profile-container {
    max-width: 800px;
    margin: 40px auto;
    padding: 0 20px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        Helvetica, Arial, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.user-card-center {
    text-align: center;
    margin-bottom: 32px;
}


h1 {
    margin: 0 0 6px 0;
    color: #1a1a1a;
    font-size: 1.75rem;
}

.email-text {
    margin: 0;
    color: #666;
    font-size: 1rem;
}

.tab-bar-container {
    display: flex;
    width: 100%;
    background-color: #f0f2f5;
    padding: 6px;
    border-radius: 12px;
    margin-bottom: 24px;
    box-sizing: border-box;
}

.tab-btn {
    flex: 1;
    background: transparent;
    border: none;
    padding: 12px 16px;
    font-size: 1rem;
    font-weight: 600;
    color: #555;
    cursor: pointer;
    border-radius: 8px;
    transition: all 0.2s ease;
    text-align: center;
}

.tab-btn:hover {
    color: #1a1a1a;
    background-color: rgba(0, 0, 0, 0.03);
}

.tab-btn.active {
    background-color: #ffffff;
    color: #0066cc;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.content-display-area {
    width: 100%;
}

.cards-grid {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
}

.empty-state {
    text-align: center;
    padding: 40px;
    color: #999;
    font-style: italic;
    background: #fafafa;
    border-radius: 8px;
    border: 1px dashed #e0e0e0;
}
</style>