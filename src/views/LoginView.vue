<template>
  <el-row
    type="flex"
    justify="center"
  >

    <el-col
      :span="8"
    >

      <el-tabs
        v-model="type"
        class="demo-tabs"
        stretch
        @tab-click="changeForm"
      >

        <ElTabPane
          label="Войти"
          name="login"
        />
        <ElTabPane
          label="Зарегистрироваться"
          name="register"
        />

      </el-tabs>

      <el-form
          ref="loginForm"
          :model="form"
          :rules="loginRules"
          label-position="top"
          style="margin-top: 20px"
          @submit.prevent="onLogin"
        >

          <el-form-item
            prop="email"
            label="Введите Ваш email"
          >
            <el-input v-model.trim="form.email"/>
          </el-form-item>

          <el-form-item
            prop="password"
            label="Введите Ваш пароль"
          >
            <el-input
              type="password"
              v-model="form.password"
            />
          </el-form-item>

          <el-form-item style="margin-top: 30px">
            <el-button
              type="primary"
              native-type="submit"
            >
              Войти
            </el-button>
            <el-button @click="onReset">Очистить форму</el-button>
          </el-form-item>
        </el-form>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { IUser } from '@/interfaces/user.interface'
import { FormInstance, ElMessage } from 'element-plus'
import type { TabsPaneContext } from 'element-plus'

const store = useStore()
const router = useRouter()
const route = useRoute()
const type = ref('login')
const loginForm = ref<FormInstance>()
const form: IUser = reactive({
  email: 'admin@mail.ru',
  password: '12345'
})
const loginRules = {
  email: [
    {
      type: 'email',
      message: 'Пожалуйста, введите корректный email.',
      trigger: ['blur', 'change']
    },
    {
      required: true,
      message: 'Это поле не может быть пустым!',
      trigger: ['blur', 'change']
    }
  ],
  password: [
    {
      min: 5,
      max: 15,
      message: 'Длина пароля должна быть не меньше 5 и не больше 15 символов',
      trigger: ['blur', 'change']
    },
    {
      required: true,
      message: 'Это поле не может быть пустым!',
      trigger: ['blur', 'change']
    }
  ]
}

const onLogin = async () => {
  console.log('onLogin')
  loginForm.value?.validate(async (valid) => {
    if (valid) {
      await store.dispatch('AuthModule/login', form)
      if (store.getters['AuthModule/token']) {
        await router.push('/')
      }
    }
  })
}

const onReset = () => {
  form.name = ''
  form.email = ''
  form.password = ''
}

const changeForm = (tab: TabsPaneContext) => {
  console.log(tab.props.name)
  switch (tab.props.name) {
    case ('register'):
      router.push({ name: 'Register' })
      break
  }
  switch (tab.props.name) {
    case ('login'):
      router.push({ name: 'Login' })
      break
  }
}

const isAuthError = computed(() => route.query.message === 'authError'
  ? ElMessage({
    type: 'error',
    message: 'Ошибка авторизации - необходимо войти в профиль!'
  })
  : route.query.message === '')
console.log(isAuthError)
watch(isAuthError, (value) => {
  ElMessage({
    type: 'error',
    message: 'Ошибка авторизации - необходимо войти в профиль!'
  })
  console.log(value)
})

</script>
