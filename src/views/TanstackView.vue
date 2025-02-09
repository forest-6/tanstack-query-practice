<template>
  <main>
    <h1>사용자 추가</h1>
    <div class="user-add-form">
      <span>
        <label for="name">이름</label>
        <div class="input-wrapper">
          <input v-model="newUser.name" type="text" id="name" />
        </div>
      </span>
      <span>
        <label for="email">이메일</label>
        <div class="input-wrapper">
          <input v-model="newUser.email" type="email" id="email" />
        </div>
      </span>
      <span>
        <label for="age">나이</label>
        <div class="input-wrapper">
          <input v-model="newUser.age" type="text" id="age" />
        </div>
      </span>
      <button class="user-add-btn" :disabled="!userInputValid" @click="addUser">추가</button>
    </div>
    <div>
      <h1>사용자 목록</h1>
      <p v-if="isLoading">Loading...</p>
      <p v-else-if="error">Error: {{ error.message }}</p>
      <div v-else>
        <table border="1" cellpadding="10">
          <thead>
            <tr>
              <th>이름</th>
              <th>이메일</th>
              <th>나이</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.age }}</td>
            </tr>
          </tbody>
        </table>
        <p v-if="isFetching">⏳ 데이터 새로 불러오는 중...</p>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { getUsersApi, createUserApi } from '@/apis/users'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, ref } from 'vue'
import type { User } from '@/types/user'

const queryClient = useQueryClient()
const newUser = ref({} as User)

const userInputValid = computed(() => {
  return newUser.value.name && newUser.value.email && newUser.value.age
})

const {
  data: users,
  isLoading,
  isFetching,
  error,
} = useQuery({
  queryKey: ['users'],
  queryFn: getUsersApi,
  staleTime: 5000, // 5초 동안 캐시된 데이터 사용
  gcTime: 10000, // 10초 후 캐시 삭제
  // refetchInterval: 8000, // 8초 후 자동 새로고침
})

const mutation = useMutation({
  mutationFn: createUserApi,
  onSuccess: (data) => {
    console.log('✅ 게시글 추가 성공:', data)
    queryClient.invalidateQueries({ queryKey: ['users'] })
    newUser.value = {} as User
  },
  onError: (error) => {
    console.error('❌ 게시글 추가 실패:', error)
  },
})

const addUser = () => {
  mutation.mutate(newUser.value)
}
</script>

<style lang="scss" scoped>
.user-add-form {
  border: 1px solid black;
  border-radius: 10px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-wrapper {
  width: 250px;
  display: flex;
  flex-direction: column;
  input {
    height: 30px;
    margin-bottom: 5px;
  }
}

button {
  height: 30px;
  margin-top: 10px;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
}
.user-add-btn {
  background: #2ca02c;
  border: 1px solid #2ca02c;
  color: #fff;
  &:disabled {
    background: lightgray;
    border: 1px solid lightgray;
    cursor: not-allowed;
  }
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  text-align: left;
  padding: 8px;
}

th {
  background-color: #cacaca;
}
</style>
