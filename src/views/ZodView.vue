<template>
  <div>
    <h2>사용자 추가</h2>
    <div class="user-add-form">
      <span>
        <label for="id">아이디</label>
        <div class="input-wrapper">
          <input type="text" id="id" v-model="id" />
          <span class="input-valid-message">{{ idValidMessage }}</span>
        </div>
      </span>
      <span>
        <label for="pw">비밀번호</label>
        <div class="input-wrapper">
          <input type="text" id="pw" v-model="pw" />
          <span class="input-valid-message">{{ pwValidMessage }}</span>
        </div>
      </span>
      <button @click="createUser">사용자 추가</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { z } from 'zod'

import { createUserApi } from '@/apis/users'

const id = ref('')
const pw = ref('')
const idValidMessage = ref('')
const pwValidMessage = ref('')

const UserId = z.string().min(4, '아이디는 4글자 이상이어야 합니다.')
const UserPw = z.string().min(4, '비밀번호는 4글자 이상이어야 합니다.')

const idValid = () => {
  try {
    UserId.parse(id.value)
    idValidMessage.value = ''
  } catch (e) {
    if (e instanceof z.ZodError) {
      e.errors.forEach((error) => {
        idValidMessage.value = error.message
        console.log(`${error.path[0]}: ${error.message}`)
      })
    }
  }
}

const pwValid = () => {
  try {
    UserPw.parse(pw.value)
    pwValidMessage.value = ''
  } catch (e) {
    if (e instanceof z.ZodError) {
      e.errors.forEach((error) => {
        pwValidMessage.value = error.message
        console.log(`${error.path[0]}: ${error.message}`)
      })
    }
  }
}

watch([id], () => idValid())
watch([pw], () => pwValid())

//TODO: 사용자 추가 form 추가
const createUser = async () => {
  await createUserApi({
    firstName: '짱구',
    lastName: '신',
    email: 'aaaaa',
    age: 5,
  })
}
</script>

<style lang="scss" scoped>
.user-add-form {
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    height: 30px;
    min-width: 200px;
  }
}

.input-valid-message {
  color: red;
  font-size: 12px;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

button {
  height: 30px;
  background-color: gainsboro;
  border: 1px solid gainsboro;
  border-radius: 10px;
  font-weight: bold;
}
</style>
