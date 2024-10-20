<template>
    <div class="relative">
        <button @click="togglePicker" class="text-blue-500 hover:bg-blue-100 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </button>
        <div v-if="isOpen" class="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-lg p-4 w-64">
            <div class="grid grid-cols-6 gap-2">
                <button v-for="emoji in emojis" :key="emoji" @click="selectEmoji(emoji)"
                    class="text-2xl hover:bg-gray-100 p-2 rounded">
                    {{ emoji }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)
const emojis = ['😀', '😂', '😍', '🥳', '😎', '🤔', '😊', '👍', '🎉', '🌟', '💖', '🔥', '👀', '🙌', '💯', '🤩']

const togglePicker = () => {
    isOpen.value = !isOpen.value
}

const selectEmoji = (emoji) => {
    emit('select', emoji)
    isOpen.value = false
}

const emit = defineEmits(['select'])
</script>
