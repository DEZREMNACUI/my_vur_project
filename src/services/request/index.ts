import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from "axios"

import { BASE_URL, TIMEOUT, base_url } from './config'
import useMainStore from '@/stores/modules/main'

const mainStore = useMainStore()

class MyRequest {
  instance
  constructor(baseURL: string, timeout = 10000) {
    this.instance = axios.create({
      baseURL,
      timeout
    })

    this.instance.interceptors.request.use(config => {
      mainStore.isLoading = true
      return config
    }, err => console.error(err))
    this.instance.interceptors.response.use(res => {
      mainStore.isLoading = false
      return res
    }, err => {
      mainStore.isLoading = false
      console.error(err)
    })
  }

  request(config: AxiosRequestConfig) {
    return new Promise<AxiosResponse>((resolve, reject) => {
      this.instance.request(config).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }

  get(config: AxiosRequestConfig) {
    return this.request({ ...config, method: "get" })
  }

  post(config: AxiosRequestConfig) {
    return this.request({ ...config, method: "post" })
  }
}

export default new MyRequest(BASE_URL, TIMEOUT)

export const cyRequest = new MyRequest(base_url, TIMEOUT)


