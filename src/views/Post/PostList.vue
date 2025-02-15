<template>
  <div class="post-list-wrapper">
    <div class="post-list">
      <div
        v-for="post in data?.pages.flatMap((group) => group.posts)"
        :key="post.id"
        class="post-item"
        ref="lastPostRef"
      >
        <h3>{{ post.title }}</h3>
        <p>{{ post.content }}</p>
      </div>
      <button v-if="hasNextPage" @click="fetchNextPage()" :disabled="isFetchingNextPage">
        {{ isFetchingNextPage ? '로딩 중...' : '더보기' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getPostListApi } from '@/apis/post'
import { useInfiniteQuery } from '@tanstack/vue-query'

const limit = 5
//TODO: 페이지 값 문제
const getPostList = async ({ pageParam = 0 }) => {
  const res = await getPostListApi(pageParam, limit)
  return { posts: res, pageParam, total: 30 }
}

const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
  queryKey: ['post'],
  queryFn: getPostList,
  gcTime: 5000,
  initialPageParam: 1,
  getNextPageParam: (lastPage) => {
    const nextPage = lastPage.pageParam + 1
    const totalPages = Math.ceil(lastPage.total / limit)

    return nextPage <= totalPages ? nextPage : undefined
  },
})
</script>
<style scoped>
.post-list-wrapper {
  height: 100%;
}

.post-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.post-item {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
}
button {
  margin-top: 12px;
  margin-bottom: 100px;
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 15px;
  cursor: pointer;
}
button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
