<template>
  <el-row justify="center">
    <el-col :span="8">
      <el-upload
        v-model:file-list="fileList"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :auto-upload="false"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>

      <el-button @click="show">
        button
      </el-button>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
import type { UploadProps, UploadUserFile } from 'element-plus'

const fileList = ref<UploadUserFile[]>([])

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

const show = () => console.log(fileList.value[0])
</script>

<!--<script setup lang="ts">-->
<!--import { reactive, ref } from 'vue'-->
<!--import { FormInstance } from 'element-plus'-->
<!--import axios from '@/axios/request'-->

<!--const myFile = ref()-->
<!--const form = ref<FormInstance>()-->
<!--const formImage = reactive({-->
<!--  image: ''-->
<!--})-->

<!--const create = async () => {-->
<!--  // const file = myFile.value.files[0]-->
<!--  // const formData = new FormData()-->
<!--  // formData.append('files', file)-->
<!--  // const data = await axios.post('/api/files/upload', formData, {-->
<!--  //   headers: {-->
<!--  //     'Content-Type': 'multipart/form-data',-->
<!--  //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment-->
<!--  //     // @ts-ignore-->
<!--  //     Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxQG1haWwuY29tIiwiaWF0IjoxNjU2MDU3Njk1fQ.1-1TM6TMN_p_XeiPYKw7GlVjdmLC0HziQb1Q92Dcw6A'-->
<!--  //   }-->
<!--  // })-->
<!--  console.log(myFile.value)-->
<!--}-->
<!--</script>-->
