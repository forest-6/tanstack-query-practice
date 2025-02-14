interface User {
  id: number
  name: string
  email: string
  age: number | string
  details?: {
    address: string
    phone: string
    job: string
  }
}

interface AddUser {
  name?: string
  email?: string
  age?: number
}

export { User, AddUser }
