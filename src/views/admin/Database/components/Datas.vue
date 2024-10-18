<template>
    <div class="table-wrapper" id="table-wrapper">
        <div id="table-container" class="table-container" ref="tableContainer">
            <table class="w-full border-collapse">
                <thead>
                    <tr>
                        <th v-for="column in columns" :key="column"
                            class="border border-gray-300 px-1 py-0.5 text-xs font-normal text-left max-w-[200px] truncate relative">
                            {{ column }}
                            <div class="resize-handle" @mousedown="startResize($event, column)"></div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, rowIndex) in list" :key="rowIndex">
                        <td v-for="column in columns" :key="`${rowIndex}-${column}`"
                            class="border border-gray-300 px-1 py-0.5 text-xs max-w-[200px] truncate"
                            @dblclick="startEditing(rowIndex, column)">
                            <span v-if="!isEditing(rowIndex, column)">{{ row[column] }}</span>
                            <input v-else v-model="row[column]" @blur="finishEditing(rowIndex, column)"
                                @keyup.enter="finishEditing(rowIndex, column)"
                                class="w-full px-1 py-0.5 text-xs border-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                                :ref="el => { if (el) el.focus() }">
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script setup lang="js">
import { ref, watch, defineProps, defineEmits, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps({
    columns: {
        type: Array,
        required: true,
        default: () => []
    },
    list: {
        type: Array,
        required: true,
        default: () => []
    }
})

const emit = defineEmits(['update:list'])

const editingRow = ref(null)
const editingColumn = ref(null)
const updatedColumns = ref([])
const tableContainer = ref(null)

const isEditing = (rowIndex, column) => {
    return editingRow.value === rowIndex && editingColumn.value === column
}

const startEditing = (rowIndex, column) => {
    editingRow.value = rowIndex
    editingColumn.value = column
}

const finishEditing = (rowIndex, column) => {
    const updatedRow = props.list[rowIndex];
    const existingIndex = updatedColumns.value.findIndex(item => item.id === updatedRow.id);

    if (existingIndex !== -1) {
        // Update existing entry
        updatedColumns.value[existingIndex] = {
            ...updatedColumns.value[existingIndex],
            [column]: updatedRow[column]
        };
    } else {
        // Add new entry
        updatedColumns.value.push({
            id: updatedRow.id,
            [column]: updatedRow[column]
        });
    }

    console.log(updatedColumns.value)
    // Emit the updated list
    emit('update:list', updatedColumns.value);
    editingRow.value = null;
    editingColumn.value = null;
}

const startResize = (event, column) => {
    const th = event.target.closest('th')
    const startX = event.pageX
    const startWidth = th.offsetWidth

    const handleMouseMove = (moveEvent) => {
        console.log(th)
        const width = startWidth + moveEvent.pageX - startX
        th.style.width = `${width}px`
    }

    const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
}

const updateTableHeight = () => {
    const tableContainer = document.querySelector('#table-container')
    const tableWrapper = document.querySelector('#table-wrapper')
    tableWrapper.style.height = tableContainer.clientHeight + 'px'
}

watch(props.list, () => {
    nextTick(() => {
        updateTableHeight()
    })
})

onMounted(() => {
    // 监听tableContainer内容变化
    const observer = new MutationObserver((mutations) => {
        updateTableHeight()
    })

    observer.observe(tableContainer.value, {
        childList: true,
        subtree: true,
        characterData: true
    })
})

onUnmounted(() => {
})

</script>
<style scoped>
.table-wrapper {
    height: 100%;
    overflow: hidden;
    position: relative;
}

.table-container {
    width: 100%;
    position: absolute;
    overflow: auto;
}

.resize-handle {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 5px;
    cursor: col-resize;
}

tbody tr:hover {
    background-color: #f0f0f0;
}
</style>
