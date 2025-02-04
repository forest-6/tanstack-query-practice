<template>
  <div>
    <h2>회원 가입</h2>
    <div class="user-add-form">
      <span>
        <label for="id">아이디</label>
        <div class="input-wrapper">
          <input type="text" id="id" v-model="idInput" />
          <span class="input-valid-message">{{ idValidMessage }}</span>
        </div>
      </span>
      <span>
        <label for="pw">비밀번호</label>
        <div class="input-wrapper">
          <input type="text" id="pw" v-model="pwInput" />
          <span class="input-valid-message">{{ pwValidMessage }}</span>
        </div>
      </span>
      <span>
        <label for="rePw">비밀번호 재확인</label>
        <div class="input-wrapper">
          <input type="text" id="rePw" v-model="rePwInput" />
          <span class="input-valid-message">{{ rePwValidMessage }}</span>
        </div>
      </span>
      <span class="button-wrapper">
        <button class="cancel" @click="$router.back()">취소</button>
        <button class="join" :disabled="!joinInputValid" @click="createUser">회원가입</button>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { z } from 'zod'

import { createUserApi } from '@/apis/users'

const idInput = ref('')
const pwInput = ref('')
const rePwInput = ref('')

const idValidMessage = ref('')
const pwValidMessage = ref('')
const rePwValidMessage = ref('')

const joinInputValid = computed(() => {
  return (
    idInput.value &&
    pwInput.value &&
    rePwInput.value &&
    !idValidMessage.value &&
    !pwValidMessage.value &&
    !rePwValidMessage.value
  )
})

const JoinId = z.string().min(1, '글자를 입력해주세요.')

const JoinPw = z
  .string()
  .min(9, '9글자 이상이어야 합니다.')
  .refine((value) => /[a-zA-Z]/.test(value), '영문자가 포함되어야 합니다.')
  .refine((value) => /\d/.test(value), '숫자가 포함되어야 합니다.')
  .refine((value) => /[^\w\s]/.test(value), '특수 문자가 포함되어야 합니다.')
  .refine((value) => !/(.)\1{2,}/.test(value), '문자나 숫자가 3회 이상 반복될 수 없습니다.')
  .refine((value) => {
    const minLength = 3
    const parts = value
      .split(/([a-zA-Z]+|\d+)/) // 숫자,영문자 구분 및 그외 문자 구분
      .map((part) => part.replace(/[^a-zA-Z0-9]/g, '')) // 숫자,영문자 외 문자 제거
      .filter(Boolean)

    for (const part of parts) {
      if (part.length >= minLength && isSequential(part)) {
        return false // 오름차순 또는 내림차순이면 false
      }
    }
    return true // 3글자 이상 연속된 오름차순 또는 내림차순이 없으면 true
  }, '문자나 숫자가 연속된 오름차순 또는 내림차순일 수 없습니다.')
  .refine((value) => idInput.value !== value, '아이디와 비밀번호는 같을 수 없습니다.')

const idValid = () => {
  try {
    JoinId.parse(idInput.value)
    idValidMessage.value = ''
  } catch (e) {
    if (e instanceof z.ZodError) {
      idValidMessage.value = e.errors[0].message
    }
  }
}

const pwValid = () => {
  try {
    JoinPw.parse(pwInput.value)
    pwValidMessage.value = ''
  } catch (e) {
    if (e instanceof z.ZodError) {
      pwValidMessage.value = e.errors[0].message
    }
  }
}

const rePwValid = () => {
  if (pwInput.value === rePwInput.value) {
    rePwValidMessage.value = ''
  } else {
    rePwValidMessage.value = '비밀번호가 일치하지 않습니다.'
  }
}

const removeSpace = (str: string) => str.replace(/\s/g, '')

watch([idInput], () => {
  idInput.value = removeSpace(idInput.value)
  idValid()
})
watch([pwInput], () => {
  pwInput.value = removeSpace(pwInput.value)
  pwValid()
})
watch([rePwInput], () => {
  rePwInput.value = removeSpace(rePwInput.value)
})
watch([idInput, pwInput], () => pwValid())
watch([pwInput, rePwInput], () => rePwValid())

//TODO: 사용자 추가 form 추가
const createUser = async () => {
  await createUserApi({
    firstName: '짱구',
    lastName: '신',
    email: 'aaaaa',
    age: 5,
  })
}

const isSequential = (str: string) => {
  let increasing = false
  let decreasing = false
  let increasingCount = 0
  let decreasingCount = 0

  // 오름차순 확인
  for (let i = 0; i < str.length; i++) {
    if (str[i + 1] === String.fromCharCode(str.charCodeAt(i) + 1)) {
      increasingCount++
    } else increasingCount = 0
    if (increasingCount >= 2) {
      increasing = true
      break
    }
  }
  // 내림차순 확인
  for (let i = 0; i < str.length; i++) {
    if (str[i + 1] === String.fromCharCode(str.charCodeAt(i) - 1)) {
      decreasingCount++
    } else decreasingCount = 0
    if (decreasingCount >= 2) {
      decreasing = true
      break
    }
  }

  if (increasing || decreasing) return true
  return false
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

.input-valid-message {
  color: red;
  font-size: 12px;
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

.button-wrapper {
  display: flex;
  gap: 10px;
  button {
    height: 30px;
    margin-top: 10px;
    border-radius: 10px;
    font-weight: bold;
    cursor: pointer;
  }
  .cancel {
    background-color: lightgray;
    border: 1px solid lightgray;
  }
  .join {
    background: #2ca02c;
    border: 1px solid #2ca02c;
    color: #fff;
    &:disabled {
      background: lightgray;
      border: 1px solid lightgray;
      cursor: not-allowed;
    }
  }
}
</style>
