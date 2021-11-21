import * as Yup from "yup";
import { validateFileSize } from "./validateFileSize";
import { validateFileType } from "./validateFileType";

const assignmentSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name should be minimum 3 chars long!")
    .max(30, "You have exceeded the limit chars!")
    .required("Required!"),

  description: Yup.string()
    .min(10, "Description should be minimum 10 chars long!")
    .max(50, "You have exceeded the limit chars!")
    .required("Required!"),

  deadline: Yup.date().required("Date is requrired!"),

  maxGrade: Yup.number().required("Required!"),

  lessonId: Yup.number().required("Required!"),

  files: Yup.array()
    .test("is-big-file", "One of the files is too big!", validateFileSize)
    .test(
      "is-correct-file",
      "One of the files' format is not correct!",
      validateFileType
    ),
});

export default assignmentSchema;
