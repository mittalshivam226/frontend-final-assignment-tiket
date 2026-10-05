import { createWebHistory, createRouter } from "vue-router";

import HomePage from "/src/pages/HomePage.vue";
import UsersPage from "/src/pages/UsersPage.vue";
import PostsPage from "/src/pages/PostsPage.vue";
import TodosPage from "/src/pages/TodosPage.vue";
import CommentsPage from "/src/pages/CommentsPage.vue";

import PostDetailsPage from "/src/pages/PostDetailsPage.vue";
import UserDetailsPage from "/src/pages/UserDetailsPage.vue";
import TodoDetailsPage from "/src/pages/TodoDetailsPage.vue";
import CommentDetailsPage from "/src/pages/CommentDetailsPage.vue";

const routes = [
    { path: "/", redirect: "/home" },
    { path: "/home", component: HomePage },
    { path: "/users", component: UsersPage },
    { path: "/posts", component: PostsPage },
    { path: "/comments", component: CommentsPage },
    { path: "/todos", component: TodosPage },

    { path: "/userdetails/:id", component: UserDetailsPage },
    { path: "/postdetails/:id", component: PostDetailsPage },
    { path: "/tododetails/:id", component: TodoDetailsPage },
    { path: "/commentdetails/:id", component: CommentDetailsPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;