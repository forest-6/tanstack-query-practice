interface User {
  id: number
  name: string
  email: string
  age: number | string
}

interface AddUser {
  name?: string
  email?: string
  age?: number
}

export { User, AddUser }
