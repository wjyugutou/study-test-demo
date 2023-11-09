import axios from 'axios'

const request = axios.create({
  timeout: 10000,
})

request.interceptors.request.use(req => req, err => Promise.resolve({ code: 0, ...err }))

request.interceptors.response.use((response) => {
  console.log(response)

  return response.data
}, err => Promise.resolve({
  code: 0,
  ...err,
}))

export default request
