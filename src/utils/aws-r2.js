import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const R2_ACCOUNT_ID = '02d2d57c4881c364ed57505f026d777f'
const R2_ACCESS_KEY_ID = 'b9eb9463af83a68eb3df23be438f66e7'
const R2_SECRET_ACCESS_KEY = 'd2ac7993a478d93f83915fc80d0faa2953feea32ce2caba79ae36e9cb047a944'
const R2_BUCKET_NAME = 'image-store' // 请替换为您的实际存储桶名称

const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
})

export async function uploadFileToR2(file, onProgress, dir = '') {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    let startTime
    let lastLoaded = 0

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const currentTime = Date.now()
        const duration = (currentTime - startTime) / 1000 // 秒
        const loaded = event.loaded
        const total = event.total
        const progress = (loaded / total) * 100
        const speed = (loaded - lastLoaded) / duration // 字节/秒

        onProgress({
          progress: progress.toFixed(2),
          speed: (speed / (1024 * 1024)).toFixed(2), // 转换为 MB/s
        })

        lastLoaded = loaded
        startTime = currentTime
      }
    }

    xhr.onload = async () => {
      if (xhr.status === 200) {
        // 构造相对 URL
        const relativeUrl = `${dir}/${file.name}`
        resolve({
          ETag: xhr.getResponseHeader("ETag"),
          url: relativeUrl,
          fileSize: file.size
        })
      } else {
        reject(new Error(`Upload failed with status ${xhr.status}`))
      }
    }

    xhr.onerror = () => reject(new Error('XHR request failed'))

    let key = dir ? `${dir}/${file.name}` : file.name
    key = key.startsWith('/') ? key.slice(1) : key
    const putObjectCommand = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
      ContentType: file.type,
    })

    getSignedUrl(s3Client, putObjectCommand, { expiresIn: 3600 })
      .then(signedUrl => {
        xhr.open('PUT', signedUrl)
        xhr.setRequestHeader('Content-Type', file.type)
        startTime = Date.now()
        xhr.send(file)
      })
      .catch(reject)
  })
}