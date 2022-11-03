import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3006/api/v1',
})

instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token')
    if (token) config.headers['authorization'] = `Bearer ${token}`
    return config
  },
  (err) => Promise.reject(err)
)
instance.interceptors.response.use(
  function (response) {
    if (response.data?.token) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.data))
    }
    return response
  },
  (err) => Promise.reject(err)
)

export default instance
