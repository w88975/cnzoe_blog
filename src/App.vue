<script setup lang="ts">
import { RouterView } from 'vue-router'
import DrawerWrapper from './components/drawer/DrawerWrapper.vue'
</script>

<template>
	<DrawerWrapper>
		<RouterView />
	</DrawerWrapper>
</template>

<style scoped></style>
