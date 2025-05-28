import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:1337/', // Ganti sesuai backend kamu
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    } else { // Dummy Sementara
      config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IiIsImxhbmciOiJpZF9JRCIsImVtYWlsIjoieXVudXMuc2FudXNpQHBlZ2FkYWlhbi5jby5pZCIsImVtcElkIjoiYzQyYjczMjEtYmJiNC00NjdkLWExNWYtMDkyOGE5Nzc4ODk0IiwibGFuZ3VhZ2UiOiJpZF9JRCIsImVudGl0eV9pZCI6bnVsbCwiZXJyb3JfbWVzc2FnZSI6Ik9LIiwidXNlcl9pZCI6IjM4NzU4IiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE3NjcyODQwMDksIm5hbWUiOiJyaWR3YW4ifQ.DrXDikz9i8qFHCC9Qbf9_azxzysqrvD5OGnez4VVgZI`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance
