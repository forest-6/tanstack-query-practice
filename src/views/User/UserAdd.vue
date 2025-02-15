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
      <button class="user-add-btn" :disabled="!userInputValid" @click="createUser">추가</button>
    </div>
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center">
        <h1>사용자 목록</h1>
        <button @click="handleRefresh">새로고침</button>
      </div>
      <p v-if="isLoading">Loading...</p>
      <p v-else-if="error">Error: {{ error.message }}</p>
      <div v-else>
        <table border="1" cellpadding="10">
          <thead>
            <tr>
              <th>이름</th>
              <th>이메일</th>
              <th>나이</th>
              <th>상세정보</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.age }}</td>
              <td>
                <button
                  @mouseover="prefetchUserDetail(user.id)"
                  @click="$router.push(`/user/detail/${user.id}`)"
                >
                  이동
                </button>
              </td>
              <td><button @click="deleteUser(user.id)">삭제</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { getUsersApi, createUserApi, deleteUserApi, getUserDetailApi } from '@/apis/user'
import type { User, AddUser } from '@/types/user'

const queryClient = useQueryClient()
const newUser = ref({} as AddUser)

const userInputValid = computed(() => {
  return newUser.value.name && newUser.value.email && newUser.value.age
})

const getUsersDelay = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return getUsersApi()
}

const {
  data: users,
  isLoading,
  error,
  refetch,
} = useQuery({
  queryKey: ['users'],
  queryFn: getUsersDelay,
  placeholderData: [{ id: 0, name: '조회중...', email: '조회중...', age: '조회중...' }],
  staleTime: 5000, // 5초 동안 캐시된 데이터 사용
  gcTime: 10000, // 10초 후 캐시 삭제
  refetchOnWindowFocus: false, // 창이 다시 활성화될 때 새로고침 안함
})

const handleRefresh = () => {
  refetch()
}

const prefetchUserDetail = (userId: number) => {
  queryClient.prefetchQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserDetailApi(userId),
  })
}

const createUserMutation = useMutation({
  mutationFn: createUserApi,
  onSuccess: (data) => {
    console.log('✅ 사용자 추가 성공:', data)
    queryClient.invalidateQueries({ queryKey: ['users'] })
    newUser.value = {}
  },
  onError: (error) => {
    console.error('❌ 사용자 추가 실패:', error)
  },
})

const deleteUserMutation = useMutation({
  mutationFn: deleteUserApi,
  onMutate: (id: number) => {
    // 현재 사용자 목록 백업
    const prevUsers = queryClient.getQueryData(['users'])
    // UI에서만 사용자 삭제
    queryClient.setQueryData(['users'], (oldUsers: User[]) =>
      oldUsers.filter((user: User) => user.id !== id),
    )
    // context로 전달
    return { prevUsers }
  },
  onError: (error, userId, context) => {
    // 실패 시 백업된 사용자 목록 복구
    queryClient.setQueryData(['users'], context?.prevUsers)
  },
  onSettled: () => {
    // 성공/실패 여부와 상관없이 users쿼리 무효화
    queryClient.invalidateQueries({ queryKey: ['users'] })
  },
})

const createUser = () => {
  createUserMutation.mutate(newUser.value)
}
const deleteUser = (id: number) => {
  deleteUserMutation.mutate(id)
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
