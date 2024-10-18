import { Message } from '@arco-design/web-vue'

const NvaMessage = {
    success: (content) => {
        Message.success(content)
    },
    error: (content) => {
        Message.error(content)
    },
    info: (content) => {
        Message.info(content)
    },
    warning: (content) => {
        Message.warning(content)
    }
}

export { NvaMessage }