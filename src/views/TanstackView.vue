<template>
  <main>
    <div>
      <h1>사용자 목록</h1>
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
            <td>{{ user.firstName }} {{ user.lastName }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.age }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

import type { User } from '@/types/user'

import { getUsersApi } from '@/apis/users'

const users = ref<User[] | null>(null)

const getUsers = async () => {
  users.value = await getUsersApi()
}

onMounted(async () => {
  await getUsers()
})
</script>

<style lang="scss" scoped>
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
  background-color: #f4f4f4;
}

tbody tr:nth-child(odd) {
  background-color: #f9f9f9;
}
</style>
