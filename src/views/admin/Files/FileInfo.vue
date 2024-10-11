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
            <!-- @click="deleteFile" -->
            <a-popover position="top" trigger="click">
                <template #content>
                    <p>确认删除此文件吗？</p>
                    <a-button type="primary" size="small" @click="deleteFile">确认</a-button>
                </template>
                <a-button type="primary" class="mt-6">删除</a-button>
            </a-popover>
        </div>
        <div v-else>
            No file information available.
        </div>
    </div>
</template>

<script setup lang="js">
import { defineProps } from 'vue';
import { OSS_URL } from '@/config';

const props = defineProps({
    file: {
        type: Object,
        required: true
    }
});

const deleteFile = () => {
    console.log('deleteFile', props.file);
}

const formatFileSize = (size) => {
    if (size < 1024) return size + ' B';
    if (size < 1024 * 1024) return (size / 1024).toFixed(2) + ' KB';
    if (size < 1024 * 1024 * 1024) return (size / (1024 * 1024)).toFixed(2) + ' MB';
    return (size / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
};

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
};
</script>