import type { Post } from '@/types/post'

const url = import.meta.env.API_BASE_URL

export const getPostListApi = async (page: number, limit: number): Promise<Post[]> => {
  const response = await fetch(`${url}/posts?_page=${page}&_limit=${limit}`)
  return await response.json()
}
