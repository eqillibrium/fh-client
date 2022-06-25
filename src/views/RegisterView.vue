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
        ref="registerForm"
        :rules="registerRules"
        :model="form"
        label-position="top"
        style="margin-top: 20px"
        @submit.prevent="onRegister"
      >
        <el-form-item
          prop="name"
          label="Напишите Ваше имя"
        >
          <el-input v-model.trim="form.name" />
        </el-form-item>

        <el-form-item
          prop="email"
          label="Укажите ваш email"
        >
          <el-input v-model="form.email" />
        </el-form-item>

        <el-form-item
          prop="password"
          label="Придумайте пароль"
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
            Зарегистрироваться
          </el-button>
          <el-button @click="onReset">Очистить форму</el-button>
        </el-form-item>

      </el-form>

    </el-col>

  </el-row>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { IUser } from '@/interfaces/user.interface'
import { FormInstance } from 'element-plus'
import type { TabsPaneContext } from 'element-plus'
import router from '@/router'

const store = useStore()
const type = ref('register')
const registerForm = ref<FormInstance>()
const form: IUser = reactive({
  name: 'admin',
  email: 'admin@mail.ru',
  password: '12345'
})

const registerRules = {
  name: [
    {
      min: 2,
      max: 15,
      message: 'Длина имени должна быть не меньше 2 и не больше 15 символов',
      trigger: ['blur', 'change']
    },
    {
      required: true,
      message: 'Это поле не может быть пустым!',
      trigger: ['blur', 'change']
    }
  ],
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

const onRegister = async () => {
  console.log('onRegister')
  registerForm.value?.validate(async (valid) => {
    if (valid) {
      await store.dispatch('AuthModule/register', form)
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

</script>
