import axios from 'axios'

const http = axios.create({
  baseURL: /*'https://house4ya.herokuapp.com' ||*/'http://localhost:5000',
  withCredentials: true
})

http.interceptors.response.use(
  (response) => response,
  (error) => error.status === 403 ? window.location = "/signin" : Promise.reject(error)
)

export default http