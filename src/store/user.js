import { reactive, watch } from 'vue'
import { getKey, saveKey } from '@/utils/serialization'

const useUser = () => {
  const userObject = {
    isAuthenticated: false,
    password: '',
  }

  const init = () => {
    Object.assign(userObject, getKey('store-user'))
  }

  init()

  const reactiveUser = reactive({
    ...userObject,
    authenticate: (password) => {
      if (password === '456111') {
        reactiveUser.password = password
        reactiveUser.isAuthenticated = true
        return true
      }
      return false
    },
    logout: () => {
      reactiveUser.isAuthenticated = false
      reactiveUser.password = ''
    }
  })

  watch(reactiveUser, (newValue) => {
    saveKey('store-user', newValue)
  }, { deep: true })

  return reactiveUser
}

const $User = useUser()

export { useUser, $User }