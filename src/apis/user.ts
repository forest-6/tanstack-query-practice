import type { User, AddUser } from '@/types/user'

const url = import.meta.env.API_BASE_URL

export const getUsersApi = async (): Promise<User[]> => {
  const response = await fetch(`${url}/users`)
  return await response.json()
}

export const getUserDetailApi = async (id: number): Promise<User> => {
  const response = await fetch(`${url}/users/${id}`)
  return await response.json()
}

export const createUserApi = async (userData: AddUser) => {
  const response = await fetch(`${url}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })

  return await response.json()
}

export const deleteUserApi = async (id: number) => {
  const response = await fetch(`${url}/users/${id}`, {
    method: 'DELETE',
  })
  if (response.ok) {
    return { message: 'success' }
  } else {
    return { message: 'fail' }
  }
}
