const validTypes = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "text/plain"
];

export function validateFileType(files) {
    let valid = true
    if (files) {
      files.map(file => {
        if (!validTypes.includes(file.type)) {
          valid = false
        }
      })
    }
    return valid
  }
