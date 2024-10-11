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
        <!-- tag选择器 -->
        <a-select class="mb-4" :loading="tagLoading" multiple v-model="tag" placeholder="Select a tag">
            <!-- <a-select-option v-for="tag in tagList" :key="tag.id" :value="tag.id">{{ tag.name }}</a-select-option> -->
            <a-option v-for="tag in tagList" :key="tag.id" :value="tag.id">{{ tag.name }}</a-option>
        </a-select>

        <v-md-editor ref="mdEditor" v-model="text" height="800px" @save="handleMDSave"></v-md-editor>
        <div class="lg:hidden">
            <h1 class="text-2xl font-bold mb-4 mt-4">Preview</h1>
            <v-md-editor :model-value="text" mode="preview"></v-md-editor>
        </div>
    </div>
</template>

<script setup lang="js">
import { ref, onMounted } from 'vue'
import { createBlog } from '@/api/blog'
import { getTagList } from '@/api/tag'
import { Message } from '@arco-design/web-vue';
import { extractSummary } from '@/utils/markdown'
import { useRouter } from 'vue-router'

const router = useRouter()  

const mdEditor = ref(null)

const title = ref('')
const text = ref('')

const tagLoading = ref(false)
const tagList = ref([])
const tag = ref([])

onMounted(() => {
    // 获取tag列表
    tagLoading.value = true
    getTagList().then(res => {
        tagList.value = res.data.data
        tagLoading.value = false
    })
})



const handleSave = () => {
    if (!mdEditor.value.text) {
        return Message.error('No Markdown content')
    }
    if (!title.value) {
        return Message.error('No title')
    }
    if (!tag.value.length) {
        return Message.error('No tag')
    }
    mdEditor.value.save();
    return

}

const handleMDSave = async (text, html) => {
    console.log(text, html)
    await createBlog({
        title: title.value,
        value: html,
        tags: tag.value.join(','),
        category_id: 1,
        thumbnail: '',
        extra: extractSummary(text),
    })
    Message.success('Create success')
    // 跳转到列表页
    router.replace('/admin/post-list')
}
</script>