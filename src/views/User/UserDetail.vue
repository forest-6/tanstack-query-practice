<template>
  <div class="user-detail">
    <h1>{{ user?.name }} 님의 프로필</h1>
    <ul>
      <li><strong>이메일:</strong> {{ user?.email }}</li>
      <li><strong>나이:</strong> {{ user?.age }}</li>
    </ul>

    <h2>상세 정보</h2>
    <ul>
      <li><strong>주소:</strong> {{ user?.details?.address }}</li>
      <li><strong>전화번호:</strong> {{ user?.details?.phone }}</li>
      <li><strong>직업:</strong> {{ user?.details?.job }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import { getUserDetailApi } from '@/apis/user'

const route = useRoute()
const userId = Number(route.params.id)

const getUserDetailDelay = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return getUserDetailApi(userId)
}

const { data: user } = useQuery({
  queryKey: ['user', userId],
  queryFn: getUserDetailDelay,
  staleTime: 5000,
  gcTime: 3000,
})
</script>

<style scoped>
.user-detail {
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

h2 {
  margin-top: 20px;
  font-size: 20px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 5px 0;
}
</style>
