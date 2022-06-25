<template>
  <div class="header">
    <h3>{{ bid.title }} <ElBadge value="status" class="status"/></h3>
    <small>
      <el-icon>
        <Timer />
      </el-icon>
      {{ new Date(bid.createdAt).toLocaleDateString() }}
    </small>
  </div>
</template>

<script>
import { Timer } from '@element-plus/icons-vue'
export default {
  name: 'BidHeader',
  props: {
    bid: {
      type: Object
    }
  },
  components: { Timer }
}
</script>

<style scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    justify-items: center;
  }
</style>
