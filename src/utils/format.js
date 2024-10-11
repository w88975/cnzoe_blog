// formatFileSize 格式化文件大小
export function formatFileSize(size) {
  return (size / 1024 / 1024).toFixed(2) + 'MB'
}