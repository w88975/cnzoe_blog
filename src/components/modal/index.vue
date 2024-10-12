<template>
    <Transition name="modal-backdrop">
        <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
            <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" @click="handleCancel"></div>

            <Transition name="modal-content">
                <div class="relative z-10 w-full max-w-lg p-6 mx-auto bg-white shadow-xl sm:max-w-xl">
                    <div class="absolute top-0 right-0 pt-4 pr-4">
                        <button @click="handleCancel"
                            class="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500">
                            <span class="sr-only">关闭</span>
                            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div class="mt-3 text-center sm:mt-0 sm:text-left">
                        <h3 class="text-lg font-medium leading-6 text-gray-900">
                            <slot name="header">{{ title }}</slot>
                        </h3>
                        <div class="mt-2">
                            <slot>
                                这里是默认的 modal 内容。您可以通过 slot 自定义此处的内容。
                            </slot>
                        </div>
                    </div>

                    <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <slot name="footer">
                            <NvaButton @click.once="ok"
                                class="w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
                                确定
                            </NvaButton>
                            <NvaButton @click.once="handleCancel"
                                class="w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm">
                                取消
                            </NvaButton>
                        </slot>
                    </div>
                </div>
            </Transition>
        </div>
    </Transition>
</template>

<script>
import NvaButton from '@/components/button/index.vue'

export default {
    name: 'NvaModal',
    components: {
        NvaButton
    },
    props: {
        modelValue: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: 'Modal 标题'
        }
    },
    emits: ['update:modelValue', 'ok', 'cancel'],
    methods: {
        ok() {
            this.$emit('ok')
            this.$emit('update:modelValue', false)
        },
        handleCancel() {
            this.$emit('cancel')
            this.$emit('update:modelValue', false)
        }
    }
}
</script>

<style scoped>
.modal-backdrop-enter-active,
.modal-backdrop-leave-active {
    transition: opacity 0.3s ease;
}

.modal-backdrop-enter-from,
.modal-backdrop-leave-to {
    opacity: 0;
}

.modal-content-enter-active {
    animation: modal-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-content-leave-active {
    animation: modal-out 0.3s cubic-bezier(0.34, 0, 0.64, 1);
}

@keyframes modal-in {
    0% {
        opacity: 0;
        transform: scale(0.4);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes modal-out {
    0% {
        opacity: 1;
        transform: scale(1);
    }

    100% {
        opacity: 0;
        transform: scale(0.4);
    }
}
</style>
