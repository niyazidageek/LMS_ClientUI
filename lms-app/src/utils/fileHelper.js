class FileHelper {
  convertToUrl(fileName) {
    return `${process.env.REACT_APP_FILES_API}${fileName}`;
  }
}
export const fileHelper = new FileHelper();
