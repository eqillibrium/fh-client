<template>
  <el-row justify="center">
    <el-col :span="12">
      <el-card>
        <template #header>
          <div class="header">
              <el-avatar :size="50" :icon="UserFilled"/>
              <span style="padding-left: 20px">{{ user.name }}</span>
          </div>
        </template>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="email" label="Email" width="180" />
          <el-table-column
            prop="role"
            label="Роль"
          >
            <template #default="scope">
              <el-tag
                :type="scope.row.role === 'Админ' ? 'warning' : 'success'"
                disable-transitions
              >{{ scope.row.role }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="Действия">
            <el-button
              type="warning"
              size="small"
            >Сделать админом</el-button>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { useUser } from '@/use/useAuth'
import { UserFilled } from '@element-plus/icons-vue'
const user = useUser()

const tableData = [
  {
    email: user.email,
    role: user.admin ? 'Админ' : 'Участник'
  }
]
</script>

<style scoped>
 .header {
   display: flex;
   align-items: center;
   justify-items: center;
 }
</style>
