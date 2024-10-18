<template>
  <TitleLine title="File List">
    <template #right>
      <a-space>
        <NvaButton type="primary" @click="showCreateFolderModal">新建文件夹</NvaButton>
        <!-- Add batch delete button -->
        <NvaButton type="primary" danger :disabled="selectedFiles.length === 0" @click="confirmBatchDelete">
          批量删除 ({{ selectedFiles.length }})
        </NvaButton>
        <NvaButton type="primary" danger :disabled="selectedFiles.length === 0" @click="handleSetPreviews">
          批量设置封面({{ selectedFiles.length }})
        </NvaButton>
      </a-space>
    </template>
  </TitleLine>

  <!-- 文件夹,文件列表 -->
  <a-spin class="w-full" :loading="loading || uploadLoading">
    <BoxView>
      <div class="flex flex-row items-center justify-between mb-4 overflow-hidden">
        <a-breadcrumb class="flex-1 min-w-0 max-w-[50%]">
          <a-breadcrumb-item @click="navigateTo('/')" class="truncate">Root</a-breadcrumb-item>
          <template v-for="(segment, index) in pathSegments" :key="index">
            <a-breadcrumb-item @click="navigateTo(segment.path)" class="truncate">
              {{ segment.name }}
            </a-breadcrumb-item>
          </template>
        </a-breadcrumb>
        <!-- 切换视图按钮, 列表/卡片 -->
        <!-- 切换视图按钮 -->
        <div class="flex flex-row items-center hidden sm:flex">
          <!-- 刷新按钮 -->
          <a-button class="mr-4" type="primary" size="mini" @click="refresh({ dir: currentDir })">
            <template #icon>
              <icon-refresh />
            </template>
          </a-button>
          <a-switch v-model="isListView" type="line" size="mini" class="mr-4 flex-shrink-0">
            <template #checked-icon>
              <!-- <icon-unordered-list /> -->
            </template>
            <template #unchecked-icon>
              <!-- <icon-apps /> -->
            </template>
          </a-switch>
          <!-- 设置别名按钮 -->
          <a-button type="primary" size="mini" @click="showSetAliasModal" class="flex-shrink-0">设置别名</a-button>
        </div>
      </div>

      <!-- 文件夹展示 -->
      <div class="w-full" @dragenter.prevent="handleDragEnter" @dragover.prevent @dragleave.prevent="handleDragLeave"
        @drop.prevent="handleFileDrop">

        <!-- 默认视图 -->
        <ViewModeFolder v-if="isListView" :file-list="list" @folderClick="folderClick"
          @triggerFileUpload="triggerFileUpload" @updateSelectedFiles="updateSelectedFiles" />
        <!-- 预览视图 -->
        <ViewModePreview v-else :file-list="list" @folderClick="folderClick" @triggerFileUpload="triggerFileUpload"
          @updateSelectedFiles="updateSelectedFiles" />
        <!-- Drag and drop overlay -->
        <div v-if="isDragging" class="absolute inset-0 bg-blue-500 bg-opacity-50 flex items-center justify-center">
          <p class="text-white text-xl font-bold">Drop files here to upload</p>
        </div>
      </div>
      <NvaPagination :hook="ListHandle" />

    </BoxView>
  </a-spin>

  <!-- 待上传文件列表, 及上传进度, 只可展示, 不可操作 -->
  <BoxView class="mt-6">
    <h3 class="text-lg font-semibold text-gray-700 mb-4">待上传文件列表</h3>
    <div v-if="uploadingFiles.length === 0" class="text-center text-gray-500 py-4">
      暂无待上传文件
    </div>
    <div v-else v-for="file in uploadingFiles" :key="file.name" class="mb-4">
      <div class="flex justify-between items-center mb-2">
        <span class="text-sm font-medium text-gray-600">{{ file.name }}</span>
        <span class="text-xs font-semibold px-2 py-1 rounded-full" :class="{
          'bg-blue-100 text-blue-800': file.status === 'uploading',
          'bg-green-100 text-green-800': file.status === 'completed',
          'bg-red-100 text-red-800': file.status === 'error'
        }">
          {{ file.status }}
          <span class="text-xs text-gray-500">{{ file.speed }}</span>
        </span>

      </div>
      <div class="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
        <div class="bg-blue-500 h-full transition-all duration-300 ease-in-out" :style="{ width: `${file.progress}%` }">
        </div>
      </div>
      <div class="text-xs text-gray-500 mt-1 text-right">
        {{ file.progress }}%
      </div>
    </div>
  </BoxView>

  <!-- Hidden file input -->
  <input type="file" ref="fileInput" @change="handleFileSelect" style="display: none;" multiple>

  <!-- 新建文件夹弹出框 -->
  <NvaModal v-model="createFolderVisible" title="新建文件夹" @ok="handleCreateFolder">
    <!-- 当前目录展示 -->
    <div class="text-sm text-gray-500 mb-4">当前目录：{{ currentDir }}</div>
    <NvaInput v-model="createFolderName" placeholder="请输入文件夹名称" />
  </NvaModal>


  <!-- 设置别名弹出框 -->
  <NvaModal v-model="setAliasVisible" title="设置别名" @ok="handleSetAlias">
    <NvaInput v-model="aliasInput" placeholder="请输入别名" />
  </NvaModal>

  <!-- 展示文件信息 -->
  <DrawerPanel v-model:visible="fileInfoVisible">
    <FileInfo :file="currentFile" @file-deleted="handleFileDeleted" @alias-updated="handleAliasUpdated" />
  </DrawerPanel>

  <!-- Add confirmation modal for batch delete -->
  <a-modal v-model:visible="batchDeleteModalVisible" title="确认批量删除" @ok="performBatchDelete"
    @cancel="batchDeleteModalVisible = false">
    <p>确定要删除选中的 {{ selectedFiles.length }} 个文件/文件夹吗？此操作不可撤销。</p>
  </a-modal>
</template>

<script setup lang="js">
import { computed, onMounted, reactive, ref, toRefs, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Message } from '@arco-design/web-vue'
import { OSS_URL } from '@/config'
import { IconRefresh } from '@arco-design/web-vue/es/icon'
import { createVideoPreviews } from '@/utils/ffmpeg'
import { getFileList, createFolder, saveUploadData, deleteFile, setFileAlias } from '@/api/files'
import { uploadFileToR2 } from '@/utils/aws-r2'
import BoxView from '@/components/BoxView.vue'
import DrawerPanel from '@/components/drawer/DrawerPanel.vue'
import FileInfo from './FileInfo.vue'
import useList from '@/hooks/useList'

// ViewModeFolder
import ViewModeFolder from './ViewModeFolder.vue'
import ViewModePreview from './ViewModePreview.vue'
const router = useRouter()
const route = useRoute()

// const loading = ref(false)
const currentDir = ref(decodeURIComponent(route.query.dir || '/'))
const fileInfoVisible = ref(false)
const createFolderVisible = ref(false)
const createFolderName = ref('')
const isDragging = ref(false)
const fileInput = ref(null)
const uploadLoading = ref(false)
const dragCounter = ref(0)
const isListView = ref(false)
const currentFile = ref(null)

const ListHandle = useList(getFileList, { dir: currentDir.value })
const { list, refresh, loading, result, page } = ListHandle

const pathSegments = computed(() => {
  const segments = currentDir.value.split('/').filter(Boolean)
  return segments.map((segment, index) => ({
    name: segment,
    path: '/' + segments.slice(0, index + 1).join('/')
  }))
})

const navigateTo = (path) => {
  router.push({ query: { dir: encodeURIComponent(path) } })
}

onMounted(() => {
  const urlDir = route.query.dir
  if (urlDir) {
    currentDir.value = decodeURIComponent(urlDir)
  }
})

watch(() => route.query.dir, (newDir) => {
  if (newDir) {
    currentDir.value = decodeURIComponent(newDir)
    refresh({ dir: currentDir.value, page: 1 })
  }
})

// 批量设置封面
const handleSetPreviews = async () => {
  // 在fileList里查出所有id的path
  const paths = list.value.filter(file => selectedFiles.value.includes(file.id)).map(file => {
    return {
      url: OSS_URL + (file.full_path),
      name: file.path,
      id: file.id
    }
  })
  // 上传预览图
  for (const path of paths) {
    const previeGifBlob = await createVideoPreviews(path.url)
    // 将Blob对象转换为File对象
    const previewGifFile = new File([previeGifBlob], `video_preview_${path.name}.gif`, { type: 'image/gif' })
    // 上传到R2
    const res = await uploadFileToR2(
      previewGifFile,
      ({ progress, speed }) => {
        console.log('上传进度:', progress, '上传速度:', speed)
      },
      '/video_preview'
    )
    await setFileAlias({
      fileId: path.id,
      alias: path.name,
      previewUrl: res.url
    })
  }
}


const folderClick = async (type, path, file) => {
  if (type === 0) {
    await router.push({ query: { dir: encodeURIComponent(path) } })
  } else {
    currentFile.value = file
    fileInfoVisible.value = true
  }
}

// 新建文件夹
const showCreateFolderModal = () => {
  createFolderVisible.value = true
}

const handleCreateFolder = async () => {
  // 校验 用正则  
  if (!/^[a-zA-Z0-9_-]+$/.test(createFolderName.value)) {
    Message.warning('文件夹名称只能包含字母、数字、下划线和横杠')
    return
  }
  loading.value = true
  const data = await createFolder({ dir: currentDir.value, folder: createFolderName.value })
  if (data.data.success) {
    Message.success('新建文件夹成功')
    await refresh({ dir: currentDir.value })
  } else {
    Message.error(data.data.message)
  }
  loading.value = false
}

const handleDragEnter = (event) => {
  event.preventDefault()
  dragCounter.value++
  if (dragCounter.value === 1) {
    isDragging.value = true
  }
}

const handleDragLeave = (event) => {
  event.preventDefault()
  dragCounter.value--
  if (dragCounter.value === 0) {
    isDragging.value = false
  }
}

// 修改 uploadingFiles 的定义
const uploadingFilesState = reactive({
  files: []
})
const { files: uploadingFiles } = toRefs(uploadingFilesState)

/**
 * 添加文件到上传队列
 * @param {File} file - 要上传的文件
 */
const addToUploadQueue = (file) => {
  uploadingFiles.value.push(reactive({
    name: file.name,
    size: file.size,
    status: 'Pending',
    progress: 0,
    speed: '0 KB/s'
  }))
}

/**
 * 更新文件上传进度
 * @param {Object} file - 上传文件对象
 * @param {number} progress - 上传进度（0-100）
 * @param {number} speed - 上传速度（字节/秒）
 */
const updateFileProgress = (file, progress, speed) => {
  file.progress = Math.round(progress)
  // file.speed = formatFileSize(speed) + '/s'
  file.speed = speed + 'MB/s'
  if (progress === 100) {
    file.status = 'Completed'
  } else {
    file.status = 'Uploading'
  }
}

/**
 * 清空上传文件列表
 */
const clearUploadingFiles = () => {
  uploadingFiles.value = []
}

// uploadVideoPreview
const uploadVideoPreview = async (file) => {
  if (file.type.startsWith('video/')) {
    const previeGifBlob = await createVideoPreviews(file)
    // 将Blob对象转换为File对象
    const previewGifFile = new File([previeGifBlob], `video_preview_${file.name}.gif`, { type: 'image/gif' })
    // 上传到R2
    const res = await uploadFileToR2(
      previewGifFile,
      ({ progress, speed }) => {
        console.log('上传进度:', progress, '上传速度:', speed)
      },
      '/video_preview'
    )
    // 保存到数据库
    await saveUploadData({
      url: res.url,
      fileSize: res.fileSize,
      dir: '/video_preview'
    })
    return res.url
  } else {
    return null
  }
}

/**
 * 处理文件上传
 * @param {FileList|File[]} files - 要上传的文件列表
 */
const handleFileUpload = async (files) => {
  uploadLoading.value = true

  try {
    const fileArray = Array.from(files)
    fileArray.forEach(addToUploadQueue)

    for (const file of fileArray) {
      const previewUrl = await uploadVideoPreview(file)
      const uploadingFile = uploadingFiles.value.find(f => f.name === file.name)
      uploadingFile.status = 'Uploading'

      const res = await uploadFileToR2(
        file,
        ({ progress, speed }) => updateFileProgress(uploadingFile, progress, speed),
        currentDir.value
      )

      if (res.url) {
        await saveUploadData({
          url: res.url,
          previewUrl: previewUrl,
          fileSize: res.fileSize,
          dir: currentDir.value
        })
        // 确保上传完成后状态更新为 Completed
        updateFileProgress(uploadingFile, 100, 0)
      }
    }

    Message.success('Files uploaded successfully')
    await refresh({ dir: currentDir.value })
    // 延迟清空上传列表，让用户能看到完成状态
    setTimeout(clearUploadingFiles, 2000)
  } catch (error) {
    Message.error('Error uploading files')
    console.error('Upload error:', error)
  } finally {
    uploadLoading.value = false
  }
}

/**
 * 处理文件拖放
 * @param {DragEvent} event - 拖放事件对象
 */
const handleFileDrop = (event) => {
  event.preventDefault()
  isDragging.value = false
  dragCounter.value = 0
  handleFileUpload(event.dataTransfer.files)
}

/**
 * 处理文件选择
 * @param {Event} event - 文件选择事件对象
 */
const handleFileSelect = (event) => {
  handleFileUpload(event.target.files)
  event.target.value = '' // 重置文件输入以允许选择相同的
}

const updateSelectedFiles = (newSelectedFiles) => {
  selectedFiles.value = newSelectedFiles
}

const triggerFileUpload = () => {
  fileInput.value.click()
}

const handleFileDeleted = async ({ success, fileId }) => {
  if (success) {
    fileInfoVisible.value = false // 关闭文件信息抽屉
    await refresh({ dir: currentDir.value }) // 刷新当前目录的文件列表
  }
}

const selectedFiles = ref([])
const batchDeleteModalVisible = ref(false)

const confirmBatchDelete = () => {
  batchDeleteModalVisible.value = true
}

const performBatchDelete = async () => {
  try {
    // Implement the API call to delete multiple files
    // await deleteMultipleFiles(selectedFiles.value)
    const ids = selectedFiles.value.join(',')
    loading.value = true
    await deleteFile({ fileIds: ids })
    Message.success(`成功删除 ${selectedFiles.value.length} 个文件/文件夹`)
    selectedFiles.value = []
    await refresh({ dir: currentDir.value })
  } catch (error) {
    Message.error('批量删除失败：' + error.message)
  } finally {
    batchDeleteModalVisible.value = false
  }
}

const setAliasVisible = ref(false)
const aliasInput = ref('')

const showSetAliasModal = (file) => {
  currentFile.value = file
  setAliasVisible.value = true
}

const handleSetAlias = async () => {
  loading.value = true
  await setFileAlias({
    path: currentDir.value,
    alias: aliasInput.value
  })
  loading.value = false
}

const handleAliasUpdated = async ({ fileId, newAlias }) => {
  // 刷新当前目录
  await refresh({ dir: currentDir.value })
}
</script>

<style scoped></style>