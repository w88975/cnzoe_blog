<template>
    <div class="relative w-full">
        <input :type="type" :value="modelValue" @input="updateValue" :placeholder="placeholder" :disabled="disabled"
            class="w-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out
             text-gray-700 bg-white
             px-3 py-1.5 text-sm
             md:px-4 md:py-2 md:text-base
             disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed" />
    </div>
</template>

<script>
export default {
    name: 'NvaInput',
    props: {
        modelValue: {
            type: [String, Number],
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:modelValue'],
    methods: {
        updateValue(event) {
            this.$emit('update:modelValue', event.target.value)
        }
    }
}
</script>
