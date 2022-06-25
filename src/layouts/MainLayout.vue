<template>
  <el-container>
    <el-header>
      <TheHeader />
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer>
      Footer
    </el-footer>
  </el-container>
</template>
<script>
import TheHeader from '@/components/main/header/TheHeader'
export default {
  components: { TheHeader }
}
</script>
