<template>
    <component :is="iconComponent" />
</template>

<script>
import { defineComponent, computed } from 'vue';
import { IconFolder, IconFile, IconImage, IconFileVideo, IconFileAudio, IconCommon, IconCode, IconQuestion } from '@arco-design/web-vue/es/icon';

export default defineComponent({
    name: 'IconFile',
    props: {
        fileName: {
            type: String,
            required: true
        },
        // 0 folder, 1 file
        type: {
            type: Number,
            default: 0
        }
    },
    setup(props) {
        const getFileExtension = (fileName) => {
            return fileName.split('.').pop().toLowerCase();
        };

        const iconComponent = computed(() => {
            if (props.type === 0) {
                return IconFolder;
            }
            const extension = getFileExtension(props.fileName);
            switch (extension) {
                case 'pdf':
                case 'doc':
                case 'docx':
                case 'txt':
                    return IconFile;
                case 'jpg':
                case 'jpeg':
                case 'png':
                case 'gif':
                    return IconImage;
                case 'mp4':
                case 'avi':
                case 'mov':
                    return IconFileVideo;
                case 'mp3':
                case 'wav':
                    return IconFileAudio;
                case 'zip':
                case 'rar':
                    return IconCommon;
                case 'js':
                case 'vue':
                case 'py':
                case 'java':
                    return IconCode;
                default:
                    return IconFile;
            }
        });

        return {
            iconComponent
        };
    }
});
</script>
