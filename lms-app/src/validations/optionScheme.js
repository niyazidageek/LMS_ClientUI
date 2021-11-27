import * as Yup from "yup";
import { validateFileSize } from "./validateFileSize";
import { validateFileType, validateImageType } from "./validateFileType";

const optionSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name should be minimum 3 chars long!")
    .max(500, "You have exceeded the limit chars!")
    .required("Required!"),

  isCorrect: Yup.string().required("Required!").oneOf(["0", "1"]),

  file: Yup.array()
    .test("is-big-file", "Image size is too big!", validateFileSize)
    .test("is-correct-file", "Image format is incorrect!", validateImageType),
});

export default optionSchema;
