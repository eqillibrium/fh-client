<template>
  <el-row justify="center">

    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>

    <el-col :span="8">
      <el-card>
        <template #header>
          <div>
            <h3> Создать заявку </h3>
          </div>
        </template>
        <el-form
          ref="form"
          :model="bidForm"
          :rules="createBidRules"
          label-position="top"
          style="margin-top: 20px"
          @submit.prevent="onCreate"
        >

          <el-form-item
            prop="title"
            label="Укажите название, например, кратко что нужно сделать"
          >
            <el-input
              v-model="bidForm.title"
              placeholder="Покормить котика"
            />
          </el-form-item>

          <el-form-item
            prop="animalType"
            label="Укажите, какой зверюшке требуется помощь"
          >
            <el-radio-group v-model="bidForm.animalType" size="small">
              <el-radio-button label="Кот" />
              <el-radio-button label="Собака" />
            </el-radio-group>
          </el-form-item>

          <el-form-item
            label="Приложите фото"
          >
            <el-upload
              v-model:file-list="bidForm.files"
              list-type="picture-card"
              :auto-upload="false"
              accept="image/png, image/jpeg"
              :limit="fileLimit"
            >
              <el-icon><Plus /></el-icon>
            </el-upload>
          </el-form-item>

          <el-form-item
            prop="description"
            label="Дополните заявку описанием возможных деталей"
          >
            <el-input
              type="text"
              v-model="bidForm.description"
            />
          </el-form-item>

          <el-form-item
            prop="address"
            label="Укажите, по какому адресу находится животное"
          >
            <el-input
              type="text"
              v-model="bidForm.address"
            />
          </el-form-item>

          <el-form-item
            prop="award"
            label="Назначьте вознаграждение исполнителю за заявку"
          >
            <el-input
              type="number"
              v-model="bidForm.award"
            />
          </el-form-item>

          <el-form-item style="margin-top: 30px">
            <el-button
              type="primary"
              native-type="submit"
            >
              Подать заявку
            </el-button>
            <el-button @click="onReset">Очистить форму</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { IBid, AnimalType } from '@/interfaces/bid.interface'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage, FormInstance, UploadProps } from 'element-plus'

const store = useStore()
const router = useRouter()
const route = useRoute()

const fileLimit = ref<number>(1)
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const form = ref<FormInstance>()

const bidForm: IBid = reactive({
  files: [],
  image: '',
  title: 'Покормить котика',
  animalType: 'Кот',
  description: 'Покормить котика сытно и вкусно',
  award: 550,
  address: 'Сочи, Войкова 1, морпорт'
})
const createBidRules = {
  title: [
    {
      required: true,
      message: 'Пожалуйста, укажите суть заявки.',
      trigger: ['blur', 'change']
    },
    {
      min: 5,
      max: 25,
      message: 'Длина текста должна быть не меньше 5 и не больше 25 символов',
      trigger: ['blur', 'change']
    }
  ],
  description: [
    {
      min: 5,
      max: 35,
      message: 'Длина текста должна быть не меньше 5 и не больше 35 символов',
      trigger: ['blur', 'change']
    },
    {
      required: true,
      message: 'Это поле не может быть пустым!',
      trigger: ['blur', 'change']
    }
  ],
  address: [
    {
      min: 5,
      max: 25,
      message: 'Длина текста должна быть не меньше 5 и не больше 25 символов',
      trigger: ['blur', 'change']
    },
    {
      required: true,
      message: 'Это поле не может быть пустым!',
      trigger: ['blur', 'change']
    }
  ]
}

const onCreate = async () => {
  form.value?.validate(async (valid) => {
    if (bidForm.files?.length === 0) {
      ElMessage({ type: 'error', message: 'Не загружено изображение!' })
      return
    }
    if (valid) {
      const image = await store.dispatch('BidModule/uploadFiles', bidForm)
      if (!image) {
        ElMessage({ type: 'error', message: 'Ошибка добавления изображения!' })
        return
      }
      bidForm.image = image[0].url
      await store.dispatch('BidModule/createBid', bidForm)
      ElMessage({ type: 'success', message: 'Объявление размещено успешно!' })
      await router.push('/')
    }
  })
}

const onReset = () => {
  bidForm.image = ''
  bidForm.title = ''
  bidForm.description = ''
  bidForm.address = ''
  bidForm.award = 0
}

</script>
