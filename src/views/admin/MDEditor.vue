<template>
    <div>
        <!-- <h1 class="text-2xl font-bold mb-4">Markdown Editor</h1> -->
        <TitleLine title="Markdown Editor">
            <template #right>
                <!-- 显示创建按钮 -->
                <a-button type="primary" @click="handleSave">Save / Create</a-button>
            </template>
        </TitleLine>
        <!-- 标题 -->
        <a-input size="mini" type="text" v-model="title" placeholder="Title" class="w-full p-2 mb-4" />

        <v-md-editor v-model="text" height="800px" @save="handleSave"></v-md-editor>
        <div class="lg:hidden">
            <h1 class="text-2xl font-bold mb-4 mt-4">Preview</h1>
            <v-md-editor :model-value="text" mode="preview"></v-md-editor>
        </div>
    </div>
</template>

<script setup lang="js">
import { ref } from 'vue'
import { createBlog } from '@/api/blog'

const title = ref('')
const text = ref('')

const handleSave = (text, html) => {
    return console.log(text, html)
    createBlog({
        title: title.value,
        value: html,
        tags: 'test,test2',
        category_id: 1,
        thumbnail: '',
        extra: '',
    })
}
</script>