<template>
  <div>
    <h2 class="text-xl font-bold mb-4">File Information</h2>
    <div v-if="file" class="space-y-4">
      <!-- 点击打开链接 -->
      <a :href="`${OSS_URL}${file.full_path}`" target="_blank" class="block">
        <p class="mb-1"><strong>Name:</strong></p>
        <span class="text-blue-500 hover:text-blue-700 underline">{{ file.file_name }}</span>
      </a>
      <p><strong>Type:</strong> {{ file.type === 0 ? 'Folder' : 'File' }}</p>
      <p><strong>Full Path:</strong> {{ file.full_path }}</p>
      <p><strong>Size:</strong> {{ formatFileSize(file.file_size) }}</p>
      <p><strong>File Type:</strong> {{ file.file_type }}</p>
      <p><strong>Created At:</strong> {{ formatDate(file.created_at) }}</p>
      <p><strong>Updated At:</strong> {{ formatDate(file.updated_at) }}</p>
      <!-- 显示删除按钮 -->
      <a-popconfirm content="确认删除此文件吗？" type="warning" :ok-loading="deleteLoading" @before-ok="handleDeleteFile">
        <a-button type="primary" class="mt-6">删除</a-button>
      </a-popconfirm>
    </div>
    <div v-else>
      No file information available.
    </div>
  </div>
</template>

<script setup lang="js">
import { defineProps, ref, defineEmits } from 'vue'
import { OSS_URL } from '@/config'
import { deleteFile } from '@/api/files'
import { Message } from '@arco-design/web-vue'

const props = defineProps({
  file: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['fileDeleted'])

const deleteLoading = ref(false)

const handleDeleteFile = async (done) => {
  deleteLoading.value = true
  try {
    const res = await deleteFile({
      fileId: props.file.id
    })
    if (res.data.success) {
      Message.success('删除成功')
      emit('fileDeleted', { success: true, fileId: props.file.id })
      done()
    } else {
      throw new Error('删除失败')
    }
  } catch (error) {
    Message.error('删除失败：' + error.message)
    emit('fileDeleted', { success: false, fileId: props.file.id, error: error.message })
    done(false)
  } finally {
    deleteLoading.value = false
  }
}

const formatFileSize = (size) => {
  if (size < 1024) return size + ' B'
  if (size < 1024 * 1024) return (size / 1024).toFixed(2) + ' KB'
  if (size < 1024 * 1024 * 1024) return (size / (1024 * 1024)).toFixed(2) + ' MB'
  return (size / (1024 * 1024 * 1024)).toFixed(2) + ' GB'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString()
}
</script>