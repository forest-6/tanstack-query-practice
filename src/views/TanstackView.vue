<template>
  <div class="wrapper">
    <button class="button button--primary" @click="$router.push('/user/add')">사용자 추가</button>
    <button class="button button--primary" @click="$router.push('/post/list')">게시글 목록</button>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
