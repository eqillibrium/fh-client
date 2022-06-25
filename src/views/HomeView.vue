<template>
  <div v-if="bidsList.length === 0">
    <h1>Нет заявок!</h1>
  </div>
  <el-row
    type="flex"
    justify="space-evenly"
    :gutter="20"
    v-else
  >
    <el-col
      :span="6"
      :xs="24"
      :sm="12"
      :md="8"
      :lg="8"
      v-for="bid in bidsList"
      :key="bid._id"
      style="margin-bottom: 20px"
    >
      <AppBid :bid="bid" />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import AppBid from '@/components/main/bid/AppBid.vue'

const store = useStore()
const bidsList = computed(() => store.getters['BidModule/getBidsList'])
onBeforeMount(async () => {
  try {
    await store.dispatch('BidModule/fetchBids')
  } catch (e) {

  }
})
</script>
