let bytesAmount = 0;

const formatBytes = (bytes) => {
  const units = ['B','KB','MB','GB','TB']

  let i = 0

  for(i; bytes >=1024 && i < 4; i++) {
    bytes /= 1024
  }

  return `${bytes.toFixed(2)} ${units[i]}`
}

const updateStatus = (size) => {
  const text = `Pending Bytes to Upload: <strong>${formatBytes(size)}</strong>`
  document.getElementById("size").innerHTML = text
}

const showSize = () => {
  const { files: fileElements } = document.getElementById('file')
  if(!fileElements.length) return;

  const files = Array.from(fileElements)
  const { size } = files.reduce((prev, next) => ({size: prev.size + next.size}), { size: 0 })

  bytesAmount = size
  updateStatus(size)

  const interval = setInterval(() => {
    console.count()
    const result = bytesAmount - 100
    bytesAmount = result < 0 ? 0 : result
    updateStatus(bytesAmount)
    if(bytesAmount === 0) clearInterval(interval)
  }, 50)
  
}

const onload = () => {
  console.log('loaded')
}

window.onload = onload
window.showSize = showSize

