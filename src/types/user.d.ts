interface User {
  id: number
  name: string
  email: string
  age: number
}

interface AddUser {
  name?: string
  email?: string
  age?: number
}

export { User, AddUser }
