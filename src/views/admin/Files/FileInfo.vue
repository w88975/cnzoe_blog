<template>
    <div>
        <h2 class="text-xl font-bold mb-4">File Information</h2>
        <div v-if="file" class="space-y-4">
            <!-- 点击打开链接 -->
            <a :href="`${OSS_URL}${file.full_path}`" target="_blank" class="block">
                <p class="mb-1"><strong>Name:</strong></p>
                <div class="break-all underline text-blue-500 hover:text-blue-700">
                    {{ OSS_URL + file.full_path }}
                </div>
            </a>
            <!-- 当文件是图片的时候, 显示预览图 -->
            <div v-if="isPreview">
                <img :src="OSS_URL + (file.preview || file.full_path)" alt="file preview" class="w-full h-auto" />
            </div>
            <p><strong>Type:</strong> {{ file.type === 0 ? 'Folder' : 'File' }}</p>
            <p class="break-all"><strong>Full Path:</strong> {{ file.full_path }}</p>
            <p><strong>Size:</strong> {{ formatFileSize(file.file_size) }}</p>
            <p><strong>File Type:</strong> {{ file.file_type }}</p>
            <p><strong>Created At:</strong> {{ formatDate(file.created_at) }}</p>
            <p><strong>Updated At:</strong> {{ formatDate(file.updated_at) }}</p>
            <!-- New alias input field -->
            <div>
                <p class="mb-1"><strong>Alias:</strong></p>
                <a-input v-model="alias" placeholder="Set an alias for this file"
                    :default-value="file.alias || file.path" @change="handleAliasChange">
                    <template #suffix>
                        <a-button type="text" @click="saveAlias" :loading="aliasSaving">
                            Save
                        </a-button>
                    </template>
                </a-input>
            </div>
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
import { defineProps, ref, defineEmits, computed } from 'vue'
import { OSS_URL } from '@/config'
import { deleteFile, setFileAlias } from '@/api/files'
import { Message } from '@arco-design/web-vue'

const props = defineProps({
    file: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['fileDeleted', 'aliasUpdated'])

const deleteLoading = ref(false)
const alias = ref(props.file.alias || props.file.path)
const aliasSaving = ref(false)

const getFileExtension = (fileName) => {
    return fileName.split('.').pop().toLowerCase()
}

const getFileType = (fileName) => {
    const extension = getFileExtension(fileName)
    switch (extension) {
        case 'pdf':
        case 'doc':
        case 'docx':
        case 'txt':
            return 'document'
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
        case 'svg':
            return 'image'
        case 'mp4':
        case 'avi':
        case 'mov':
            return 'video'
        case 'mp3':
        case 'wav':
            return 'audio'
        case 'zip':
        case 'rar':
        case '7z':
        case 'tar':
        case 'gz':
        case 'bz2':
        case 'xz':
            return 'zip'
        case 'js':
        case 'vue':
        case 'py':
        case 'java':
            return 'code'
        default:
            return 'unknown'
    }
}

const isPreview = computed(() => {
    return (getFileType(props.file.file_name) === 'image') || (getFileType(props.file.file_name) === 'video')
})

const handleDeleteFile = async (done) => {
    deleteLoading.value = true
    try {
        const res = await deleteFile({
            fileIds: props.file.id + ''
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

const handleAliasChange = (value) => {
    alias.value = value
}

const saveAlias = async () => {
    aliasSaving.value = true
    try {
        const res = await setFileAlias({
            fileId: props.file.id,
            alias: alias.value
        })
        if (res.data.success) {
            Message.success('Alias saved successfully')
            emit('aliasUpdated', { fileId: props.file.id, newAlias: alias.value })
        } else {
            throw new Error('Failed to save alias')
        }
    } catch (error) {
        Message.error('Failed to save alias: ' + error.message)
    } finally {
        aliasSaving.value = false
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
