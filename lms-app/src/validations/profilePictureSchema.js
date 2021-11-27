import * as Yup from "yup";
import { validateFileSize } from "./validateFileSize";
import { validateFileType, validateImageType } from "./validateFileType";

const profilePictureSchema = Yup.object().shape({
  file: Yup.array()
    .test("is-big-file", "Image size is too big!", validateFileSize)
    .test("is-correct-file", "Image format is incorrect!", validateImageType),
});

export default profilePictureSchema;
