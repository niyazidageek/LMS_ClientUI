const validFileTypes = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "text/plain",
];

const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];

export function validateFileType(files) {
  let valid = true;
  if (files) {
    files.map((file) => {
      if (!validFileTypes.includes(file.type)) {
        valid = false;
      }
    });
  }
  return valid;
}

export function validateImageType(images) {
  let valid = true;
  if (images) {
    images.map((image) => {
      if (!validImageTypes.includes(image.type)) {
        valid = false;
      }
    });
  }
  return valid;
}
