import * as Yup from "yup";

const applicationSchema = Yup.object().shape({
  message: Yup.string()
    .min(3, "Name should be minimum 3 chars long!")
    .max(400, "You have exceeded the limit chars!")
    .required("Required!"),
});

export default applicationSchema;
