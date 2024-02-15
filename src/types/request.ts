export interface CommonResponse<T> {
  success: boolean
  message: string
  data: T
}

export interface CommonListResponse<T> {
  total: number
  items: T[]
}
