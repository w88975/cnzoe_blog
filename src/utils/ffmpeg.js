// ... existing code ...
// import { FFmpeg } from '@ffmpeg/ffmpeg'
// import { fetchFile, toBlobURL } from '@ffmpeg/util'
import GIF from 'gif.js'
// const baseURL = 'https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm'

async function createVideoPreviews(videoInput) {
  try {
    let videoUrl

    if (videoInput instanceof File) {
      videoUrl = URL.createObjectURL(videoInput)
    } else if (typeof videoInput === 'string') {
      videoUrl = videoInput
    } else {
      throw new Error('Invalid input: expected File object or URL string')
    }

    // 创建video元素
    const video = document.createElement('video')
    video.src = videoUrl
    video.crossOrigin = 'anonymous' // 如果视频来自不同域
    video.muted = true // 静音视频以避免自动播放限制
    video.playsInline = true // 内联播放，避免全屏

    // 等待视频加载元数据
    await new Promise((resolve, reject) => {
      video.onloadedmetadata = resolve
      video.onerror = reject
    })

    // 创建canvas元素
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    // 设置canvas大小
    canvas.width = 150
    canvas.height = 150

    // 定义截图的时间点（10%, 30%, 50%, 70%）
    const percentages = [0.1, 0.3, 0.5, 0.7]
    const frames = []

    for (const percentage of percentages) {
      // 设置视频当前时间
      video.currentTime = video.duration * percentage

      // 等待视频seek完成
      await new Promise(resolve => {
        const seekHandler = () => {
          video.removeEventListener('seeked', seekHandler)
          resolve()
        }
        video.addEventListener('seeked', seekHandler)
        // 添加超时处理
        setTimeout(() => {
          video.removeEventListener('seeked', seekHandler)
          resolve()
        }, 1000) // 1秒超时
      })

      // 在canvas上绘制黑色背景
      ctx.fillStyle = 'black'
      ctx.fillRect(0, 0, 150, 150)

      // 计算缩放和位置以保持宽高比
      const scale = Math.min(150 / video.videoWidth, 150 / video.videoHeight)
      const x = (150 - video.videoWidth * scale) / 2
      const y = (150 - video.videoHeight * scale) / 2

      // 在canvas上绘制缩放后的视频帧
      ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, x, y, video.videoWidth * scale, video.videoHeight * scale)

      // 将canvas内容添加到frames数组
      frames.push(ctx.getImageData(0, 0, 150, 150))

      console.log(`截取预览图 ${percentage * 100}% 完成`)
    }

    // 创建GIF
    const gif = new GIF({
      workers: 2,
      quality: 10,
      width: 150,
      height: 150
    })

    // 添加帧到GIF
    frames.forEach(frame => {
      gif.addFrame(frame, {delay: 500}) // 每帧显示500毫秒
    })

    // 渲染GIF
    const gifBlob = await new Promise(resolve => {
      gif.on('finished', blob => {
        resolve(blob)
      })
      gif.render()
    })

    if (videoInput instanceof File) {
      URL.revokeObjectURL(videoUrl)
    }

    console.log('GIF预览图生成完成')
    return gifBlob
  } catch (error) {
    console.error('创建视频预览失败:', error)
    return null
  }
}

// async function createGifFromVideo(videoInput) {
//   const segments = await downloadVideoSegments('https://oss.cnzoe.com/PORN/X_Videos/%E7%94%B7%E4%BA%BA%E5%9C%A8%E6%9C%BA%E5%9C%BA%E8%BF%B7%E8%B7%AF%EF%BC%8C%E9%81%87%E5%88%B0%E4%BA%86%E7%83%AD%E5%BF%83%E7%9A%84%E7%A9%BA%E5%A7%90%E5%B8%AE%E5%BF%99%E5%B8%A6%E8%B7%AF%EF%BC%8C%E4%BD%86%E6%B2%A1%E6%83%B3%E5%88%B0%E7%A9%BA%E5%A7%90%E7%AB%9F%E6%98%AF%E6%B7%AB%E8%B4%B1%E9%AA%9A%E8%B4%A7%EF%BC%8C%E7%9B%B4%E6%8E%A5%E5%9C%A8%E6%9C%BA%E5%9C%BA%E5%81%9C%E8%BD%A6%E5%9C%BA%E8%BD%A6%E9%9C%87%EF%BC%8C%E7%88%B1%E6%AD%BB%E8%BF%99%E4%B8%AA%E5%A6%B9%E5%AD%90%E4%BA%86%EF%BC%8C%E6%8B%8D%E7%9A%84%E7%89%87%E6%92%B8%E7%82%B9%E8%B6%85%E9%AB%98.mp4' || videoInput)
//   return
//   const ffmpeg = new FFmpeg()

//   // 加载 FFmpeg
//   await ffmpeg.load({
//     coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript', { cache: true }),
//     wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm', { cache: true }),
//     workerURL: await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, 'text/javascript', { cache: true })
//   })

//   // 检查是否已经加载过
//   if (!ffmpeg.loaded) {
//     await ffmpeg.load({
//       coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript', { cache: true }),
//       wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm', { cache: true }),
//       workerURL: await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, 'text/javascript', { cache: true })
//     })
//   }

//   // // 获取视频文件
//   // let file
//   // if (videoInput instanceof File) {
//   //   // 如果是本地File对象
//   //   file = await fetchFile(videoInput)
//   // } else if (typeof videoInput === 'string') {
//   //   // 如果是URL字符串
//   //   file = videoInput.startsWith('file://') ? videoInput : await fetchFile(videoInput)
//   // } else {
//   //   throw new Error('Invalid input: expected File object or URL string')
//   // }

//   await ffmpeg.writeFile('input.mp4', segments[0])

//   // 截取视频的 4 帧
//   for (let i = 0; i < 4; i++) {
//     const time = (i * 0.75).toFixed(2) // 0%, 25%, 50%, 75% of video duration
//     await ffmpeg.exec(['-i', 'input.mp4', '-ss', `${time}`, '-vframes', '1', `frame${i}.png`, '-vf', 'scale=-1:150'])
//     console.log(`截取帧 ${i + 1}/4 完成 (${i * 25}% 进度)`)
//   }

//   // 创建一个数组来存储所有图片的 blob
//   const imageBlobs = []

//   // 读取并转换每一帧为 blob
//   for (let i = 0; i < 4; i++) {
//     const data = await ffmpeg.readFile(`frame${i}.png`)
//     const blob = new Blob([data], { type: 'image/png' })
//     imageBlobs.push(blob)
//     console.log(`图片 ${i + 1}/4 已转换为 blob`)
//   }

//   // 清理临时文件
//   for (let i = 0; i < 4; i++) {
//     await ffmpeg.deleteFile(`frame${i}.png`)
//   }
//   await ffmpeg.deleteFile('input.mp4')

//   // 打印完整的 blob URL
//   for (let i = 0; i < imageBlobs.length; i++) {
//     const blobUrl = URL.createObjectURL(imageBlobs[i])
//     const img = document.createElement('img')
//     img.src = blobUrl
//     img.style.width = 'auto' // 宽度自适应
//     img.style.height = '150px' // 设置高度为150像素
//     document.body.appendChild(img)
//     console.log(`Frame ${i + 1} Blob URL: ${blobUrl}`)
//   }
//   return imageBlobs
// }

// ... existing code ...

// 导出函数
export { createVideoPreviews }
