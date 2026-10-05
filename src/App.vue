<script setup>
import HeaderComponent from "./components/HeaderComponent.vue";
</script>

<template>
  <HeaderComponent />
  <main class="main-content">
    <RouterView />
  </main>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  color: #2c3e50;
  background-color: #ffffff;
  line-height: 1.6;
}

#app {
  max-width: 1280px;
  margin: 0 auto;
}

.main-content {
  margin-top: 60px;
  padding: 20px;
}
</style>