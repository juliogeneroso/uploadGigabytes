let bytesAmount = 0;
const API_URL = "http://localhost:3000"
const ON_UPLOAD_EVENT = 'file-uploaded'

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

const updateMessage = (msg) => {
  const msg = document.getElementById('msg')
  msg.innerHTML = message
}

const showMessage = () => {
  const urlParams = new URLSearchParams(window.location.search)

  const serverMessage = urlParams.get('msg')

  if(!serverMessage) return

  updateMessage(serverMessage)
}

const configureForm = (targetUrl) => {
  const form = document.getElementById("form")
  form.action = targetUrl
}

const onload = () => {

  showMessage() 

  const ioClient = io.connect(API_URL, {
    withCredentials: false
  })

  ioClient.on("connect", (msg) => {
    console.log('Connected!', ioClient.id)
    const targetUrl = API_URL + `?sockedId=${ioClient.id}`
    configureForm(targetUrl)
  })

  ioClient.on(ON_UPLOAD_EVENT, (bytesReceived) => {
    //console.log('received', bytesReceived)
    /* bytesAmount = bytesAmount - bytesReceived
    updateStatus(bytesAmount) */
  })

  updateStatus(0)
}

window.onload = onload
window.showSize = showSize

