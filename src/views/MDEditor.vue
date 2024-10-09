<template>
    <div>
        <h1 class="text-2xl font-bold mb-4">Markdown Editor</h1>
        <v-md-editor v-model="text" height="800px"></v-md-editor>
        <h1 class="text-2xl font-bold mb-4 mt-4">Preview</h1>
        <v-md-editor :model-value="text" height="800px" mode="preview"></v-md-editor>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const text = ref('')
</script>