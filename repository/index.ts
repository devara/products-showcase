export type ApiResponse<T> = Promise<T>

const api = $fetch.create({ baseURL: '/api' })

export default api
