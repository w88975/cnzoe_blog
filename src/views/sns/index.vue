<template>
    <div class="max-w-2xl mx-auto ">
        <!-- Post creation section -->
        <div class="bg-white rounded-lg shadow mb-6">
            <div class="p-4">
                <div class="relative">
                    <TagInput v-model="postValue" ref="tagInputRef" />
                </div>
                <div class="flex items-center justify-between mt-3">
                    <div class="flex space-x-2">
                        <button @click="openUploadDialog('image')"
                            class="text-blue-500 hover:bg-blue-100 p-2 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </button>
                        <button @click="openUploadDialog('video')"
                            class="text-blue-500 hover:bg-blue-100 p-2 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        </button>
                        <button class="text-blue-500 hover:bg-blue-100 p-2 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                        </button>
                        <EmojiPicker @select="insertEmoji" />
                    </div>
                    <button
                        class="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Post
                    </button>
                </div>

                <UploadedPreview v-model:files="uploadedFiles" />
            </div>
        </div>
    </div>

    <SNSList />

    <!-- Upload Dialog -->
    <NvaModal v-if="!isMobile" v-model="showUploadDialog" :title="uploadDialogTitle">
        <UploadContent :type="uploadType" />
    </NvaModal>

    <NvaDrawer v-else v-model:visible="showUploadDialog" :title="uploadDialogTitle" okText="开始上传"
        @ok="uploadContentRef.doUpload()">
        <UploadContent :type="uploadType" ref="uploadContentRef" @complete="handleUploadComplete" />
    </NvaDrawer>
</template>

<script setup>
import { ref, computed } from 'vue'
import TagInput from './components/TagInput.vue'
import EmojiPicker from './components/EmojiPicker.vue'
import NvaModal from '@/components/modal/index.vue'
import NvaDrawer from '@/components/drawer/DrawerPanel.vue'
import UploadContent from './components/UploadContent.vue'
import UploadedPreview from './components/UploadedPreview.vue'
import SNSList from './components/SNSList.vue'

const isLoading = ref(false)
const showTagList = ref(false)
const tagList = ref([])

const uploadContentRef = ref(null)
const tagInputRef = ref(null)
const postValue = ref('')

const showUploadDialog = ref(false)
const uploadType = ref('')
// const isMobile = computed(() => window.innerWidth < 768)
const isMobile = ref(true)

const uploadedFiles = ref([])

const uploadDialogTitle = computed(() => {
    return uploadType.value === 'image' ? 'Upload Image' : 'Upload Video'
})

const openUploadDialog = (type) => {
    uploadType.value = type
    showUploadDialog.value = true
}

const handleUploadComplete = (list, type) => {
    console.log('upload complete', list)
    // list 是 ['url', 'url2']
    // 创建一个新的数组，包含现有的文件和新上传的文件
    const newFiles = list.map(url => ({ url, type }))

    // 合并现有文件和新文件，并使用 Set 去重
    const uniqueFiles = Array.from(new Set([...uploadedFiles.value, ...newFiles].map(JSON.stringify))).map(JSON.parse)

    // 更新 uploadedFiles
    uploadedFiles.value = uniqueFiles
    console.log('uploadedFiles', uploadedFiles.value)
    showUploadDialog.value = false
}

const handleInput = (event) => {
    const content = event.target.innerText
    const lastChar = content.slice(-1)
    if (lastChar === '#') {
        fetchTags()
    } else {
        showTagList.value = false
    }
}

const fetchTags = () => {
    isLoading.value = true
    showTagList.value = false

    setTimeout(() => {
        tagList.value = ['programming', 'vuejs', 'javascript', 'webdev']
        isLoading.value = false
        showTagList.value = true
    }, 1000)
}

const selectTag = (tag) => {
    const editor = document.querySelector('[contenteditable]') // Assuming the editor is the contenteditable element
    const selection = window.getSelection()

    // Ensure the selection is within the editor
    if (!selection.rangeCount || !editor.contains(selection.anchorNode)) {
        // If no selection or selection is outside the editor, move cursor to the end
        const range = document.createRange()
        range.selectNodeContents(editor)
        range.collapse(false)
        selection.removeAllRanges()
        selection.addRange(range)
    }

    const range = selection.getRangeAt(0)

    // Find the last # symbol
    const editorContent = editor.innerText
    const lastHashIndex = editorContent.lastIndexOf('#')

    if (lastHashIndex !== -1) {
        // If # is found, delete it and the content after it
        const textNode = editor.firstChild || editor.appendChild(document.createTextNode(''))
        range.setStart(textNode, lastHashIndex)
        range.setEnd(textNode, editorContent.length)
        range.deleteContents()
    }

    // Insert the colored tag
    const tagSpan = document.createElement('span')
    tagSpan.style.color = 'blue'
    tagSpan.textContent = `#${tag} `
    range.insertNode(tagSpan)

    // Move the cursor after the inserted tag
    range.setStartAfter(tagSpan)
    range.setEndAfter(tagSpan)
    selection.removeAllRanges()
    selection.addRange(range)

    showTagList.value = false
    editor.focus()
}

const insertEmoji = (emoji) => {
    console.log(emoji)
    tagInputRef.value.insertText(emoji)
}


</script>

<style scoped>
[contenteditable]:empty:before {
    content: attr(placeholder);
    color: #aaa;
    font-style: italic;
}
</style>
