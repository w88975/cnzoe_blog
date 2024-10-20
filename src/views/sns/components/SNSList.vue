<template>
    <!-- Posts list -->
    <TransitionGroup name="post-list" tag="div" class="space-y-6 mb-4" v-if="posts.length > 0">
        <div v-for="post in posts" :key="post.id" class="post-item">
            <div class="bg-white rounded-lg shadow overflow-hidden relative">
                <!-- Add delete button -->
                <button @click="handleDelete(post.id)" class="absolute top-2 right-2 text-gray-500 hover:text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </button>
                <div class="p-4">
                    <p class="text-gray-800 text-base mb-4 whitespace-pre-line leading-relaxed font-sans">
                        {{ post.text }}
                    </p>
                    <div v-if="post.images" class="grid grid-cols-3 gap-2 mb-4">
                        <template v-for="(image, index) in post.images.split(',').slice(0, 9)" :key="index">
                            <div v-if="index < 8 || post.images.split(',').length <= 9" class="aspect-w-1 aspect-h-1">
                                <img :src="image" :alt="`Post image ${index + 1}`"
                                    class="w-full h-full object-cover rounded">
                            </div>
                            <div v-else class="aspect-w-1 aspect-h-1 relative">
                                <img :src="image" :alt="`Post image ${index + 1}`"
                                    class="w-full h-full object-cover rounded">
                                <div
                                    class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
                                    <span class="text-white text-xl font-bold">+{{ post.images.split(',').length - 8
                                        }}</span>
                                </div>
                            </div>
                        </template>
                    </div>
                    <div class="flex items-center justify-between text-sm text-gray-500">
                        <span>{{ new Date(post.create_at).toLocaleString() }}</span>
                        <div class="flex items-center space-x-2" v-if="post.tags">
                            <span v-for="tag in post.tags.split(',')" :key="tag">#{{ tag }}</span>
                        </div>
                    </div>
                    <div class="flex items-center justify-between mt-4 pt-4 border-t">
                        <button class="flex items-center space-x-2 text-gray-500 hover:text-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span>0 Comments</span>
                        </button>
                        <button class="flex items-center space-x-2 text-gray-500 hover:text-red-500">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span>{{ post.likes }} Likes</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </TransitionGroup>
    <div v-else class="space-y-6 mb-4">
        <div v-for="i in 3" :key="i" class="bg-white rounded-lg shadow overflow-hidden animate-pulse skeleton-fade">
            <div class="p-4">
                <div class="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div class="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div class="grid grid-cols-3 gap-2 mb-4">
                    <div v-for="j in 3" :key="j" class="aspect-w-1 aspect-h-1">
                        <div class="w-full h-full bg-gray-200 rounded"></div>
                    </div>
                </div>
                <div class="flex items-center justify-between">
                    <div class="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div class="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
                <div class="flex items-center justify-between mt-4 pt-4 border-t">
                    <div class="h-5 bg-gray-200 rounded w-1/4"></div>
                    <div class="h-5 bg-gray-200 rounded w-1/4"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="js">
import { watch } from 'vue'

const props = defineProps({
    posts: {
        type: Array,
        required: true
    }
})

const emit = defineEmits(['delete'])

// Watch for changes in the posts array
watch(() => props.posts, (newPosts, oldPosts) => {
    if (newPosts.length > oldPosts.length) {
        // New post(s) added
        console.log('New post(s) added')
    }
}, { deep: true })

// Handle delete button click
const handleDelete = (postId) => {
    emit('delete', postId)
}
</script>

<style scoped>
.skeleton-fade {
    animation: skeleton-fade 1.5s ease-in-out infinite;
}

@keyframes skeleton-fade {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.4;
    }

    100% {
        opacity: 1;
    }
}

.post-list-enter-active,
.post-list-leave-active {
    transition: all 0.5s ease;
}

.post-list-enter-from,
.post-list-leave-to {
    opacity: 0;
    transform: translateY(30px);
}

.post-list-move {
    transition: transform 0.5s ease;
}
</style>
