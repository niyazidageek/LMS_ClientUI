import * as Yup from "yup";
import { validateFileSize } from "./validateFileSize";
import { validateFileType, validateImageType } from "./validateFileType";

const questionSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name should be minimum 3 chars long!")
    .max(500, "You have exceeded the limit chars!")
    .required("Required!"),

  point: Yup.number().min(0,"Point can't be less than 0!").required("Required!"),

  file: Yup.array()
    .test("is-big-file", "Image size is too big!", validateFileSize)
    .test(
      "is-correct-file",
      "Image format is incorrect!",
      validateImageType
    ),
});

export default questionSchema;