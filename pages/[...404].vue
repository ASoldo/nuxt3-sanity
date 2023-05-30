<template>
  <div class="error-page">
    <h1>Error</h1>
    <p>We're sorry, but something went wrong.</p>
    <a href="/">Go Back</a>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.error-page {
  text-align: center;
  padding: 2rem;
}

.error-page h1 {
  font-size: 2rem;
  color: #b71c1c;
}

.error-page p {
  color: #757575;
}

.error-page button {
  margin-top: 2rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #fff;
  background-color: #3f51b5;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.error-page button:hover {
  background-color: #303f9f;
}
</style>
