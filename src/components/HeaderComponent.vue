<script setup>
</script>

<template>
    <header>
        <nav>
            <ul>
                <li>
                    <RouterLink to="/home">HOME</RouterLink>
                </li>
                <li>
                    <RouterLink to="/users">USERS</RouterLink>
                </li>
                <li>
                    <RouterLink to="/posts">POSTS</RouterLink>
                </li>
                <li>
                    <RouterLink to="/comments">COMMENTS</RouterLink>
                </li>
                <li>
                    <RouterLink to="/todos">TODOS</RouterLink>
                </li>
            </ul>
        </nav>
    </header>
</template>

<style scoped>
header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background-color: #adf1fc;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
}

nav {
    display: flex;
    justify-content: center;
}

ul {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2.5rem;
    list-style: none;
    margin: 0;
    padding: 0;
}

a {
    color: #64748b;
    text-decoration: none;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    transition: all 0.2s ease;
}

a:hover {
    color: #0f172a;
    background-color: #f1f5f9;
}

.router-link-active {
    color: #2563eb;
    background-color: #eff6ff;
}
</style>