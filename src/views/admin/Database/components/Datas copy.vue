<template>
    <div class="table-wrapper">
        <div class="table-container">
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
import { ref, watch, defineProps, defineEmits, onMounted, onUnmounted } from 'vue'

const props = defineProps({
    columns: {
        type: Array,
        required: true,
        default: () => [
            "id",
            "parent_id",
            "type",
            "path",
            "full_path",
            "file_name",
            "file_size",
            "file_type",
            "alias",
            "preview",
            "extra",
            "extra2",
            "is_deleted",
            "created_at",
            "updated_at"
        ]
    },
    list: {
        type: Array,
        required: true,
        default: () => [
            {
                "id": 1,
                "parent_id": 0,
                "type": 0,
                "path": "/",
                "full_path": "/",
                "file_name": "/",
                "file_size": 0,
                "file_type": "",
                "alias": "",
                "preview": "",
                "extra": "",
                "extra2": "",
                "is_deleted": 0,
                "created_at": "",
                "updated_at": ""
            },
            {
                "id": 29,
                "parent_id": 1,
                "type": 0,
                "path": "images",
                "full_path": "/images",
                "file_name": "images",
                "file_size": 0,
                "file_type": "folder",
                "alias": "图片",
                "preview": "",
                "extra": null,
                "extra2": null,
                "is_deleted": 0,
                "created_at": "2024-10-11T08:42:28.347Z",
                "updated_at": "2024-10-11T08:42:28.347Z"
            },
            {
                "id": 30,
                "parent_id": 29,
                "type": 1,
                "path": "Subtract@2x.png",
                "full_path": "/images/Subtract@2x.png",
                "file_name": "Subtract@2x.png",
                "file_size": 177251,
                "file_type": "image/png",
                "alias": "",
                "preview": "",
                "extra": null,
                "extra2": null,
                "is_deleted": 1,
                "created_at": "2024-10-11T08:42:46.383Z",
                "updated_at": "2024-10-11T16:02:21.850Z"
            },
            {
                "id": 31,
                "parent_id": 1,
                "type": 1,
                "path": "6d4b1f67d6ff40359325554d3998f166.mp3",
                "full_path": "/6d4b1f67d6ff40359325554d3998f166.mp3",
                "file_name": "6d4b1f67d6ff40359325554d3998f166.mp3",
                "file_size": 2342,
                "file_type": "audio/mpeg",
                "alias": "",
                "preview": "",
                "extra": null,
                "extra2": null,
                "is_deleted": 0,
                "created_at": "2024-10-11T09:12:44.925Z",
                "updated_at": "2024-10-11T09:12:44.925Z"
            },
            {
                "id": 33,
                "parent_id": 29,
                "type": 1,
                "path": "Screenrecorder-2024-06-12-11-11-11-758.mp4",
                "full_path": "/images/Screenrecorder-2024-06-12-11-11-11-758.mp4",
                "file_name": "Screenrecorder-2024-06-12-11-11-11-758.mp4",
                "file_size": 24057485,
                "file_type": "video/mp4",
                "alias": "",
                "preview": "",
                "extra": null,
                "extra2": null,
                "is_deleted": 1,
                "created_at": "2024-10-11T09:23:49.528Z",
                "updated_at": "2024-10-11T16:02:21.850Z"
            },
            {
                "id": 34,
                "parent_id": 1,
                "type": 1,
                "path": "IMG_7662.jpeg",
                "full_path": "/IMG_7662.jpeg",
                "file_name": "IMG_7662.jpeg",
                "file_size": 1014308,
                "file_type": "image/jpeg",
                "alias": "",
                "preview": "",
                "extra": null,
                "extra2": null,
                "is_deleted": 0,
                "created_at": "2024-10-11T09:55:48.040Z",
                "updated_at": "2024-10-11T09:55:48.040Z"
            },
            {
                "id": 35,
                "parent_id": 1,
                "type": 1,
                "path": "Squish_it_seed1423175453.mp4",
                "full_path": "/Squish_it_seed1423175453.mp4",
                "file_name": "Squish_it_seed1423175453.mp4",
                "file_size": 1403155,
                "file_type": "video/mp4",
                "alias": "Squish_it_seed1423175453.mp4",
                "preview": "/video_preview/video_preview_Squish_it_seed1423175453.mp4.gif",
                "extra": null,
                "extra2": null,
                "is_deleted": 0,
                "created_at": "2024-10-11T09:58:02.897Z",
                "updated_at": "2024-10-11T09:58:02.897Z"
            },
            {
                "id": 36,
                "parent_id": 1,
                "type": 1,
                "path": "3923eef4-3cd0-45ab-a719-de84f04f3c9c.png",
                "full_path": "/3923eef4-3cd0-45ab-a719-de84f04f3c9c.png",
                "file_name": "3923eef4-3cd0-45ab-a719-de84f04f3c9c.png",
                "file_size": 745653,
                "file_type": "image/png",
                "alias": "",
                "preview": "",
                "extra": null,
                "extra2": null,
                "is_deleted": 1,
                "created_at": "2024-10-11T10:02:22.676Z",
                "updated_at": "2024-10-11T13:12:10.796Z"
            },
            {
                "id": 37,
                "parent_id": 1,
                "type": 1,
                "path": "客服@2x.png",
                "full_path": "/客服@2x.png",
                "file_name": "客服@2x.png",
                "file_size": 1123,
                "file_type": "image/png",
                "alias": "",
                "preview": "",
                "extra": null,
                "extra2": null,
                "is_deleted": 1,
                "created_at": "2024-10-11T10:27:29.500Z",
                "updated_at": "2024-10-11T13:07:34.434Z"
            },
            {
                "id": 38,
                "parent_id": 1,
                "type": 1,
                "path": "IMG_7522.gif",
                "full_path": "/IMG_7522.gif",
                "file_name": "IMG_7522.gif",
                "file_size": 2860976,
                "file_type": "image/gif",
                "alias": "",
                "preview": "",
                "extra": null,
                "extra2": null,
                "is_deleted": 0,
                "created_at": "2024-10-11T10:49:40.801Z",
                "updated_at": "2024-10-11T10:49:40.801Z"
            },
            {
                "id": 39,
                "parent_id": 1,
                "type": 1,
                "path": "开屏.psd",
                "full_path": "/开屏.psd",
                "file_name": "开屏.psd",
                "file_size": 2888166,
                "file_type": "image/vnd.adobe.photoshop",
                "alias": "",
                "preview": "",
                "extra": null,
                "extra2": null,
                "is_deleted": 1,
                "created_at": "2024-10-11T13:03:47.710Z",
                "updated_at": "2024-10-11T13:10:54.686Z"
            },
            {
                "id": 40,
                "parent_id": 1,
                "type": 1,
                "path": "hn1fc.png",
                "full_path": "/hn1fc.png",
                "file_name": "hn1fc.png",
                "file_size": 11579,
                "file_type": "image/png",
                "alias": "",
                "preview": "",
                "extra": null,
                "extra2": null,
                "is_deleted": 1,
                "created_at": "2024-10-11T13:14:34.749Z",
                "updated_at": "2024-10-11T13:14:47.040Z"
            },
            {
                "id": 41,
                "parent_id": 1,
                "type": 1,
                "path": "hn5fc.png",
                "full_path": "/hn5fc.png",
                "file_name": "hn5fc.png",
                "file_size": 14092,
                "file_type": "image/png",
                "alias": "",
                "preview": "",
                "extra": null,
                "extra2": null,
                "is_deleted": 1,
                "created_at": "2024-10-11T13:14:37.013Z",
                "updated_at": "2024-10-11T13:14:53.756Z"
            },
            {
                "id": 42,
                "parent_id": 1,
                "type": 1,
                "path": "落地页.webp",
                "full_path": "/落地页.webp",
                "file_name": "落地页.webp",
                "file_size": 389404,
                "file_type": "image/webp",
                "alias": "",
                "preview": "",
                "extra": null,
                "extra2": null,
                "is_deleted": 1,
                "created_at": "2024-10-11T13:17:07.542Z",
                "updated_at": "2024-10-11T13:17:11.995Z"
            },
            {
                "id": 43,
                "parent_id": 1,
                "type": 1,
                "path": "砸金蛋.jpeg",
                "full_path": "/砸金蛋.jpeg",
                "file_name": "砸金蛋.jpeg",
                "file_size": 60180,
                "file_type": "image/jpeg",
                "alias": "",
                "preview": "",
                "extra": null,
                "extra2": null,
                "is_deleted": 1,
                "created_at": "2024-10-11T13:21:25.685Z",
                "updated_at": "2024-10-11T13:22:23.099Z"
            },
            {
                "id": 44,
                "parent_id": 1,
                "type": 0,
                "path": "PORN",
                "full_path": "/PORN",
                "file_name": "PORN",
                "file_size": 0,
                "file_type": "folder",
                "alias": "学习资料",
                "preview": "",
                "extra": null,
                "extra2": null,
                "is_deleted": 0,
                "created_at": "2024-10-11T13:24:36.004Z",
                "updated_at": "2024-10-11T13:24:36.004Z"
            },
            {
                "id": 46,
                "parent_id": 29,
                "type": 1,
                "path": "bg_t.png",
                "full_path": "/images/bg_t.png",
                "file_name": "bg_t.png",
                "file_size": 38846,
                "file_type": "png",
                "alias": "",
                "preview": "",
                "extra": null,
                "extra2": null,
                "is_deleted": 1,
                "created_at": "2024-10-11T15:10:55.620Z",
                "updated_at": "2024-10-11T15:11:05.065Z"
            },
            {
                "id": 47,
                "parent_id": 29,
                "type": 1,
                "path": "落地页.webp",
                "full_path": "/images/落地页.webp",
                "file_name": "落地页.webp",
                "file_size": 389404,
                "file_type": "webp",
                "alias": "",
                "preview": "",
                "extra": null,
                "extra2": null,
                "is_deleted": 1,
                "created_at": "2024-10-11T15:11:33.712Z",
                "updated_at": "2024-10-11T16:02:21.850Z"
            },
            {
                "id": 48,
                "parent_id": 29,
                "type": 1,
                "path": "开屏.psd",
                "full_path": "/images/开屏.psd",
                "file_name": "开屏.psd",
                "file_size": 2888166,
                "file_type": "psd",
                "alias": "",
                "preview": "",
                "extra": null,
                "extra2": null,
                "is_deleted": 1,
                "created_at": "2024-10-11T15:14:01.804Z",
                "updated_at": "2024-10-11T16:02:21.850Z"
            },
            {
                "id": 49,
                "parent_id": 29,
                "type": 1,
                "path": "砸金蛋.jpeg",
                "full_path": "/images/砸金蛋.jpeg",
                "file_name": "砸金蛋.jpeg",
                "file_size": 60180,
                "file_type": "jpeg",
                "alias": "",
                "preview": "",
                "extra": null,
                "extra2": null,
                "is_deleted": 1,
                "created_at": "2024-10-11T15:17:24.070Z",
                "updated_at": "2024-10-11T16:02:21.850Z"
            }
        ]
    }
})

const emit = defineEmits(['update:list'])

const editingRow = ref(null)
const editingColumn = ref(null)
const updatedColumns = ref([])

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

const tableWrapper = ref(null)
const tableContainer = ref(null)

const updateTableHeight = () => {
    if (tableWrapper.value && tableContainer.value) {
        const wrapperHeight = tableWrapper.value.clientHeight
        tableContainer.value.style.maxHeight = `${wrapperHeight}px`
    }
}

onMounted(() => {
    updateTableHeight()
    window.addEventListener('resize', updateTableHeight)
})

onUnmounted(() => {
    window.removeEventListener('resize', updateTableHeight)
})

</script>
<style>
body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
}
</style>
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
