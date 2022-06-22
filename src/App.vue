<template>
  <component :is="`${layout}-layout`" v-if="layout"></component>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MainLayout from '@/layouts/MainLayout'
import AdminLayout from '@/layouts/AdminLayout'

export default {
  setup () {
    const route = useRoute()
    const layout = computed(() => route.meta.layout)
    return {
      layout
    }
  },
  components: { MainLayout, AdminLayout }
}

</script>
