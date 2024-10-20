<template>
    <!-- Display uploaded content -->
    <div v-if="files.length > 0" class="mt-4">
        <h3 class="text-sm font-semibold text-gray-700 mb-2">Uploaded Content:</h3>
        <draggable v-model="localFiles" class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2" item-key="url">
            <template #item="{ element: file }">
                <div
                    class="relative bg-gray-100 aspect-square border border-gray-200 rounded-md overflow-hidden group cursor-move">
                    <!-- Image preview -->
                    <img v-if="file.type === 'image'" :src="file.url" alt="Uploaded image"
                        class="w-full h-full object-contain">
                    <!-- Video preview -->
                    <video v-else-if="file.type === 'video'" :src="file.url"
                        class="w-full h-full object-contain"></video>
                    <!-- <span class="absolute top-1 left-1 bg-black bg-opacity-50 rounded-full p-1">{{ file }}</span> -->
                    <!-- File type indicator -->
                    <div class="absolute top-1 left-1 bg-black bg-opacity-50 rounded-full p-1">
                        <svg v-if="file.type === 'image'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white"
                            viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                clip-rule="evenodd" />
                        </svg>
                        <svg v-else-if="file.type === 'video'" xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                        </svg>
                    </div>
                    <!-- Remove button -->
                    <div
                        class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button @click="removeFile(index)" class="text-white hover:text-red-500 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </template>

        </draggable>
    </div>

    <!-- delete dialog -->
    <NvaModal v-model="showDeleteDialog" title="Delete Post" @ok="handleDelete">
        <p>Are you sure you want to delete this post?</p>
    </NvaModal>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed } from 'vue'
import draggable from 'vuedraggable'

const dragging = ref(false)

const props = defineProps({
    files: {
        type: Array,
        required: false,
        default: () => [
            {
                "url": "https://oss.cnzoe.com/SNS/127_1012_1729438451620.png",
                "type": "image"
            },
            {
                "url": "https://oss.cnzoe.com/SNS/127_6727_1729438451621.png",
                "type": "image"
            },
            {
                "url": "https://oss.cnzoe.com/SNS/127_7102_1729438451621.png",
                "type": "image"
            }
        ]
    }
})

const emit = defineEmits(['update:files'])

const showDeleteDialog = ref(false)
const deleteIndex = ref(null)
const localFiles = computed({
    get: () => props.files,
    set: (value) => emit('update:files', value)
})

const handleDelete = () => {
    const updatedFiles = [...localFiles.value]
    updatedFiles.splice(deleteIndex.value, 1)
    emit('update:files', updatedFiles)
    showDeleteDialog.value = false
}

const removeFile = (index) => {
    deleteIndex.value = index
    showDeleteDialog.value = true
}

const onDragEnd = () => {
    dragging.value = false
    emit('update:files', localFiles.value)
}
</script>
