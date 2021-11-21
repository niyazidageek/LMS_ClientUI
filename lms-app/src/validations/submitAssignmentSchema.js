import * as Yup from "yup";
import { validateFileSize } from "./validateFileSize";
import { validateFileType } from "./validateFileType";

const submitAssignmentSchema = Yup.object().shape({
  files: Yup.array()
    .test("is-big-file", "One of the files is too big!", validateFileSize)
    .test(
      "is-correct-file",
      "One of the files' format is not correct!",
      validateFileType
    )
    .required("Required!")
});

export default submitAssignmentSchema;
