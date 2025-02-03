<template>
  <div class="wrapper">
    <button class="button button--primary" @click="$router.push('/tanstack')">Tanstack</button>
    <button class="button button--secondary" @click="$router.push('/zod')">Zod</button>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  gap: 10px;
}
.button {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition:
    background 0.3s ease,
    transform 0.2s ease;

  &--primary {
    background: #ff7f0e; // 주황색
    color: #fff;

    &:hover {
      background: #e66900;
    }

    &:active {
      transform: scale(0.98);
    }
  }

  &--secondary {
    background: #2ca02c; // 초록색
    color: #fff;

    &:hover {
      background: #228b22;
    }

    &:active {
      transform: scale(0.98);
    }
  }
}
</style>
