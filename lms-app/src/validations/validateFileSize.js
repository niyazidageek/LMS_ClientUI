export function validateFileSize(files){
  let valid = true
  if (files) {
    files.map(file => {
      const size = file.size / 1024 / 1024
      if (size > 16) {
        valid = false
      }
    })
  }
  return valid
}
