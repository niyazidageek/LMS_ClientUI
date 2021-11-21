import * as Yup from "yup";
import { validateDraftJs } from "./validateDraftJs";

const theorySchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name should be minimum 3 chars long!")
    .max(30, "You have exceeded the limit chars!")
    .required("Required!"),

  point: Yup.number().required("Required!"),

  content: Yup.object().shape({
    blocks: Yup.array().test("has-content", "Required!", validateDraftJs),
  }),
});

export default theorySchema;
