<template>
    <button :class="[
        'px-4 py-2 font-semibold transition-opacity duration-200 ease-in-out',
        'focus:outline-none active:opacity-70 cursor-pointer',
        colorClasses[color],
        { 'w-full': block },
        { 'opacity-50 cursor-not-allowed': disabled }
    ]" :disabled="disabled">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'NvaButton',
    props: {
        color: {
            type: String,
            default: 'primary',
            validator: (value) => ['primary', 'secondary', 'success', 'danger', 'warning'].includes(value)
        },
        disabled: {
            type: Boolean,
            default: false
        },
        block: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            colorClasses: {
                primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:hover:bg-blue-600',
                secondary: 'bg-gray-600 text-white hover:bg-gray-700 disabled:hover:bg-gray-600',
                success: 'bg-green-600 text-white hover:bg-green-700 disabled:hover:bg-green-600',
                danger: 'bg-red-600 text-white hover:bg-red-700 disabled:hover:bg-red-600',
                warning: 'bg-yellow-600 text-black hover:bg-yellow-700 disabled:hover:bg-yellow-600'
            }
        }
    },
}
</script>
