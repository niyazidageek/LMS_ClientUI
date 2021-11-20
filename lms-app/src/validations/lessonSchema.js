import * as Yup from "yup";

const lessonSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name should be minimum 3 chars long!")
    .max(30, "You have exceeded the limit chars!")
    .required("Required!"),

  description: Yup.string()
    .min(10, "Description should be minimum 10 chars long!")
    .max(30, "You have exceeded the limit chars!")
    .required("Required!"),

  startDate: Yup.date().required("Date is requrired!"),

  endDate: Yup.date().required("Date is requrired!"),

  isOnline: Yup.string().required("Required!").oneOf(["0", "1"]),
});

export default lessonSchema;
