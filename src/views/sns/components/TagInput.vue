<template>
    <div class="relative w-full max-w-2xl mx-auto">
        <textarea ref="inputRef" placeholder="分享你的想法..."
            class="rich-input w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none text-sm sm:text-base"
            @input="handleInput" @keydown="handleKeyDown" v-model="inputText" rows="4"></textarea>
        <div v-if="isLoading" class="absolute right-2 bottom-2">
            <svg class="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
            </svg>
        </div>
        <div v-if="showTagSelector && filteredTags.length > 0"
            class="tag-selector mt-2 p-2 border rounded-lg shadow-sm bg-white">
            <div v-for="(tag, index) in filteredTags" :key="tag" :class="[
                'cursor-pointer p-2 rounded transition-colors duration-200 text-sm sm:text-base',
                index === selectedTagIndex ? 'bg-blue-100' : 'hover:bg-gray-100'
            ]" @click="selectTag(tag)">
                {{ tag }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick, defineExpose } from 'vue'
import { getTableData } from '@/api/db'

const inputRef = ref(null)
const showTagSelector = ref(false)
const tagSuggestions = ref([])
const inputText = ref('')
const isLoading = ref(false)
const selectedTagIndex = ref(0)
const currentTagQuery = ref('')

// Simulated API call for tag suggestions
const fetchTagSuggestions = async (query) => {
    isLoading.value = true
    try {
        const res = await getTableData({ tableName: 'tags' })
        const allTags = res.data.data.list.map(item => item.value)
        console.log(res.data.data.list)
        return allTags.filter(tag => tag.toLowerCase().startsWith(query.toLowerCase()))
    } finally {
        isLoading.value = false
    }
}

const filteredTags = computed(() => {
    return tagSuggestions.value.filter(tag =>
        tag.toLowerCase().startsWith(currentTagQuery.value.toLowerCase())
    )
})

const handleInput = async () => {
    const cursorPosition = inputRef.value.selectionStart
    const textBeforeCursor = inputText.value.slice(0, cursorPosition)
    const match = textBeforeCursor.match(/#(\w*)$/)

    if (match) {
        currentTagQuery.value = match[1]
        showTagSelector.value = true
        tagSuggestions.value = await fetchTagSuggestions(currentTagQuery.value)
        selectedTagIndex.value = 0
    } else {
        showTagSelector.value = false
    }
}

const handleKeyDown = (event) => {
    if (!showTagSelector.value) return

    switch (event.key) {
        case 'ArrowDown':
            event.preventDefault()
            selectedTagIndex.value = (selectedTagIndex.value + 1) % filteredTags.value.length
            break
        case 'ArrowUp':
            event.preventDefault()
            selectedTagIndex.value = (selectedTagIndex.value - 1 + filteredTags.value.length) % filteredTags.value.length
            break
        case 'Enter':
            event.preventDefault()
            if (filteredTags.value.length > 0) {
                selectTag(filteredTags.value[selectedTagIndex.value])
            }
            break
        case 'Escape':
            showTagSelector.value = false
            break
    }
}

const selectTag = (tag) => {
    const cursorPosition = inputRef.value.selectionStart
    const textBeforeCursor = inputText.value.slice(0, cursorPosition).replace(/#\w*$/, '')
    const textAfterCursor = inputText.value.slice(cursorPosition)

    inputText.value = `${textBeforeCursor}#${tag} ${textAfterCursor}`
    showTagSelector.value = false

    nextTick(() => {
        const newPosition = textBeforeCursor.length + tag.length + 2 // +2 for '#' and space
        inputRef.value.setSelectionRange(newPosition, newPosition)
        inputRef.value.focus()
    })

    selectedTagIndex.value = 0
    currentTagQuery.value = ''
}

const insertText = (text) => {
    const cursorPosition = inputRef.value.selectionStart
}

defineExpose({
    insertText
})

watch(filteredTags, (newTags) => {
    if (newTags.length > 0) {
        selectedTagIndex.value = 0
    }
})

onMounted(() => {
    inputRef.value.focus()
})
</script>

<style>
.rich-input {
    min-height: 100px;
    width: 100%;
    resize: vertical;
}

.tag-span {
    color: #007bff;
}
</style>
