<template>
  <div v-for="file in fileList" :key="file.id"
    class="flex flex-col items-center p-2 border rounded cursor-pointer active:opacity-50 relative">
    <!-- Update checkbox for multi-selection -->
    <div class="absolute top-2 right-2 z-10">
      <a-checkbox :model-value="selectedFiles.includes(file.id)"
        @change="(checked) => toggleFileSelection(file.id, checked)" />
    </div>

    <div @click="folderClick(file.type, file.full_path, file)"
      class="w-24 h-32 flex flex-col items-center justify-center">

      <IconFilePreview :file="file" />
      <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-1 text-xs">
        <div class="truncate text-center">{{ file.alias || file.path }}</div>
        <div class="text-center" v-if="file.type === 1">{{ formatFileSize(file.file_size) }}</div>
      </div>
    </div>
  </div>
  <!-- 上传按钮 -->
  <div class="flex flex-col items-center justify-center p-2 border rounded cursor-pointer active:opacity-50"
    @click="triggerFileUpload">
    <icon-plus size="24" class="mb-2" />
    <span class="text-sm text-center break-words">上传</span>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { OSS_URL } from '@/config'
import IconFile from '@/components/icons/iconFile.vue'
import { formatFileSize } from '@/utils/format'
import IconFilePreview from './IconFilePreview.vue'
import { IconPlus, IconCheck, IconClose } from '@arco-design/web-vue/es/icon'
// props
const props = defineProps({
  fileList: {
    type: Array,
    required: true
  }
})
const emit = defineEmits(['folderClick', 'triggerFileUpload', 'updateSelectedFiles'])
const selectedFiles = ref([])
// Update toggleFileSelection function
const toggleFileSelection = (fileId, checked) => {
  if (checked) {
    selectedFiles.value.push(fileId)
  } else {
    const index = selectedFiles.value.indexOf(fileId)
    if (index > -1) {
      selectedFiles.value.splice(index, 1)
    }
  }
  console.log('selectedFiles', selectedFiles.value)
  emit('updateSelectedFiles', selectedFiles.value)
}
const triggerFileUpload = () => {
  emit('triggerFileUpload')
}
const folderClick = (type, fullPath, file) => {
  emit('folderClick', type, fullPath, file)
}
</script>
