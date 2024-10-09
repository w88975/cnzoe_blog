<template>
    <div>
        <p v-for="blog in blogList" :key="blog.id">{{ blog.title }}</p>
        <h1 class="text-2xl font-bold mb-4">Markdown Editor</h1>
        <v-md-editor v-model="text" height="800px" @save="save"></v-md-editor>
        <div class="lg:hidden">
            <h1 class="text-2xl font-bold mb-4 mt-4">Preview</h1>
            <v-md-editor :model-value="text" mode="preview"></v-md-editor>
        </div>
    </div>
</template>

<script setup lang="js">
import { ref, onMounted } from 'vue'
import { createBlog, getBlogList } from '@/api/blog'
const text = ref('')
const blogList = ref([])

onMounted(() => {
    getBlogList().then(res => {
        blogList.value = res.data.data.list
    })
})

const save = (text, html) => {
    console.log(html)
    createBlog({
        title: 'test',
        value: html,
        tags: 'test,test2',
        category_id: 1,
        thumbnail: '',
        extra: '',
    })
}
</script>