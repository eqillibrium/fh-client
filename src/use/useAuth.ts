import { computed, reactive } from 'vue'
import { useStore } from 'vuex'

export const useAuth = () => computed(() => useStore().getters['AuthModule/token'])

export const useUser = () => reactive(useStore().getters['AuthModule/user'])
