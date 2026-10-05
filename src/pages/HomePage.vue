<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "../store/user-store.js";
import { usePostStore } from "../store/post-store.js";
import { useCommentStore } from "../store/comment-store.js";
import { useTodoStore } from "../store/todo-store.js";
import { storeToRefs } from "pinia";

const router = useRouter();

const userStore = useUserStore();
const { setCurrentDisplayedUser, fetchUserData } = userStore;
const { userData } = storeToRefs(userStore);

const postStore = usePostStore();
const { setCurrentDisplayedPost, fetchPostData } = postStore;
const { postData } = storeToRefs(postStore);

const commentStore = useCommentStore();
const { setCurrentDisplayedComment, fetchCommentData } = commentStore;
const { commentData } = storeToRefs(commentStore);

const todoStore = useTodoStore();
const { setCurrentDisplayedTodo, fetchTodoData } = todoStore;
const { todoData } = storeToRefs(todoStore);

if (userData.value.length === 0) fetchUserData();
if (postData.value.length === 0) fetchPostData();
if (commentData.value.length === 0) fetchCommentData();
if (todoData.value.length === 0) fetchTodoData();

function navigateToPage(address) {
    router.push(`/${address}`);
}

function navigateToUserDetails(user) {
    setCurrentDisplayedUser(user);
    router.push(`/userdetails/${user.id}`);
}

function navigateToPostDetails(post) {
    setCurrentDisplayedPost(post);
    router.push(`/postdetails/${post.id}`);
}

function navigateToCommentDetails(comment) {
    setCurrentDisplayedComment(comment);
    router.push(`/commentdetails/${comment.id}`);
}

function navigateToTodoDetails(todo) {
    setCurrentDisplayedTodo(todo);
    router.push(`/tododetails/${todo.id}`);
}
</script>

<template>
    <div class="listOfRequests">
        <div class="listOfUsers">
            <h3>Top Users</h3>
            <ul>
                <li v-for="user in userData.slice(0, 3)" :key="user.id" @click="navigateToUserDetails(user)">
                    {{ user.name }}
                </li>
                <li class="see-all" @click="navigateToPage('users')">See All</li>
            </ul>
        </div>

        <div class="listOfPosts">
            <h3>Top Posts</h3>
            <ul>
                <li v-for="post in postData.slice(0, 3)" :key="post.id" @click="navigateToPostDetails(post)">
                    {{ post.title }}
                </li>
                <li class="see-all" @click="navigateToPage('posts')">See All</li>
            </ul>
        </div>

        <div class="listOfComments">
            <h3>Top Comments</h3>
            <ul>
                <li v-for="comment in commentData.slice(0, 3)" :key="comment.id"
                    @click="navigateToCommentDetails(comment)">
                    {{ comment.body }}
                </li>
                <li class="see-all" @click="navigateToPage('comments')">See All</li>
            </ul>
        </div>

        <div class="listOfTodos">
            <h3>Top Todos</h3>
            <ul>
                <li v-for="todo in todoData.slice(0, 3)" :key="todo.id" @click="navigateToTodoDetails(todo)">
                    {{ todo.title }}
                </li>
                <li class="see-all" @click="navigateToPage('todos')">See All</li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.listOfRequests {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 20px;
    font-family: sans-serif;
}

.listOfUsers,
.listOfPosts,
.listOfComments,
.listOfTodos {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

h3 {
    margin: 0;
    color: #333;
}

ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
    margin: 0;
    gap: 12px;
}

li {
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 16px 24px;
    min-width: 120px;
    max-width: 300px;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s, box-shadow 0.2s;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

li:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.see-all {
    background-color: #f0f4f8;
    color: #0066cc;
    font-weight: bold;
    cursor: pointer;
    border-color: #d0e0f0;
}

.see-all:hover {
    background-color: #e1ecf7;
}
</style>