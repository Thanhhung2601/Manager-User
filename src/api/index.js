import axios from 'axios'

const API = axios.create({ baseURL: 'https://reqres.in' })

export const getUser = (user) => API.post('/api/login', user)
export const getAllUserByPage = (page) => API.get(`api/users?page=${page}`)
export const createNewUser = (userInfo) => API.post('/api/users', userInfo)
