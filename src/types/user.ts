export interface UserType {
  id: number
  username: string
  role: string
  isAdmin: boolean
}

export interface UserLoginDataType {
  username: string
  password: string
}

export interface UserRegisterDataType {
  username: string
  password: string
}
