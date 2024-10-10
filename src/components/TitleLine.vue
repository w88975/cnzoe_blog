<template>
    <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold mb-4">{{ title }}</h1>
        <div>
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script setup lang="js">
import { defineProps } from 'vue'

defineProps({
    title: {
        type: String,
        default: ''
    }
})
</script>