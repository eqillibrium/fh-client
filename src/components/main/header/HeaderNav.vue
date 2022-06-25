<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    router
  >
    <el-menu-item index="0"><strong>Friend`s Help</strong></el-menu-item>

    <div class="flex-grow" />

    <el-menu-item index="/">
      <el-icon><House /></el-icon>
      <span>Главная </span>
    </el-menu-item>

    <el-menu-item index="/about">
      <el-icon><Postcard /></el-icon>
      <span>О нас </span>
    </el-menu-item>

    <el-menu-item
      index="/bid/create"
      v-if="isAuth"
    >
      <el-icon><Plus /></el-icon>
      <span>Создать заявку</span>
    </el-menu-item>

    <el-sub-menu
      index="/profile"
      v-if="isAuth"
    >
      <template #title>{{ user.email }}</template>

      <el-menu-item
        index="/profile"
        style="display: flex; justify-content: space-around;"
      >
        <span>Профиль</span>
        <el-icon>
          <User/>
        </el-icon>
      </el-menu-item>

      <el-button
        style="width: 100%"
        @click="logout"
        plain
      >
        Выйти
        <el-icon class="el-icon--right">
          <Right />
        </el-icon>
      </el-button>

    </el-sub-menu>

    <el-menu-item
      v-else
      index="/register"
    >
      <el-icon><Right /></el-icon>
      <span>Войти </span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useAuth, useUser } from '@/use/useAuth'
import { Right, User, Plus, Postcard, House } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const store = useStore()
const router = useRouter()
const isAuth = useAuth()
const user = useUser()

const logout = () => {
  store.dispatch('AuthModule/logout')
  ElMessage({
    type: 'warning',
    message: 'Вы вышли из профиля'
  })
  router.push('/')
}
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
