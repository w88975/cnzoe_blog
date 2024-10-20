<template>
    <!-- Posts list -->
    <div class="space-y-6 mb-4">
        <div class="bg-white rounded-lg shadow overflow-hidden">
            <div class="p-4">
                <p class="text-gray-800 mb-4">This is a sample post with some text content. It could be longer or
                    shorter depending on the user's input.</p>
                <div class="grid grid-cols-3 gap-2 mb-4">
                    <img src="https://via.placeholder.com/150" alt="Post image"
                        class="w-full h-32 object-cover rounded">
                    <img src="https://via.placeholder.com/150" alt="Post image"
                        class="w-full h-32 object-cover rounded">
                    <img src="https://via.placeholder.com/150" alt="Post image"
                        class="w-full h-32 object-cover rounded">
                    <img src="https://via.placeholder.com/150" alt="Post image"
                        class="w-full h-32 object-cover rounded">
                    <div class="relative w-full h-32">
                        <img src="https://via.placeholder.com/150" alt="Post image"
                            class="w-full h-full object-cover rounded">
                        <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
                            <span class="text-white text-xl font-bold">+4</span>
                        </div>
                    </div>
                </div>
                <div class="flex items-center justify-between text-sm text-gray-500">
                    <span>2 hours ago</span>
                    <span>#sample #post</span>
                </div>
                <div class="flex items-center justify-between mt-4 pt-4 border-t">
                    <button class="flex items-center space-x-2 text-gray-500 hover:text-blue-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span>23 Comments</span>
                    </button>
                    <button class="flex items-center space-x-2 text-gray-500 hover:text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span>99 Likes</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="space-y-6">
        <div class="bg-white rounded-lg shadow overflow-hidden">
            <div class="p-4">
                <p class="text-gray-800 mb-4">This is a sample post with some text content. It could be longer or
                    shorter depending on the user's input.</p>
                <!-- <div class="grid grid-cols-3 gap-2 mb-4">
                        <img src="https://via.placeholder.com/150" alt="Post image"
                            class="w-full h-32 object-cover rounded">
                        <img src="https://via.placeholder.com/150" alt="Post image"
                            class="w-full h-32 object-cover rounded">
                        <img src="https://via.placeholder.com/150" alt="Post image"
                            class="w-full h-32 object-cover rounded">
                        <img src="https://via.placeholder.com/150" alt="Post image"
                            class="w-full h-32 object-cover rounded">
                        <div class="relative w-full h-32">
                            <img src="https://via.placeholder.com/150" alt="Post image"
                                class="w-full h-full object-cover rounded">
                            <div
                                class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
                                <span class="text-white text-xl font-bold">+4</span>
                            </div>
                        </div>
                    </div> -->
                <div class="flex items-center justify-between text-sm text-gray-500">
                    <span>2 hours ago</span>
                    <span>#sample #post</span>
                </div>
                <div class="flex items-center justify-between mt-4 pt-4 border-t">
                    <button class="flex items-center space-x-2 text-gray-500 hover:text-blue-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span>23 Comments</span>
                    </button>
                    <button class="flex items-center space-x-2 text-gray-500 hover:text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span>99 Likes</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    posts: {
        type: Array,
        required: true
    }
})
</script>