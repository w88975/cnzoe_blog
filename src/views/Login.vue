<template>
  <a-layout class="h-screen">
    <a-layout-content class="flex justify-center">
      <div class="login-container w-full max-w-sm p-4 md:p-8">
        <a-typography-title :heading="2" class="mb-6 text-center">登录</a-typography-title>
        <a-form :model="form" @submit="login" layout="vertical" class="text-center">
          <a-form-item field="password" class="mb-4">
            <a-input-password v-model="form.password" placeholder="请输入密码" allow-clear :style="{ width: '100%' }" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit" :style="{ width: '100%' }">
              登录
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { reactive, onMounted } from 'vue'
import { $User } from '@/store/user'
import { Message } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const form = reactive({
      password: '',
    })

    onMounted(() => {
      const logout = router.currentRoute.value.query.logout
      if (logout) {
        $User.logout()
      }
    })

    const login = () => {
      const state = $User.authenticate(form.password)
      if (state) {
        router.push('/')
      } else {
        Message.error('密码错误')
      }
    }

    return {
      form,
      login,
    }
  },
}
</script>

<style scoped>
.login-container {
  margin-top: 2rem;
}

@media (min-width: 768px) {
  .login-container {
    margin-top: 4rem;
  }
}
</style>
