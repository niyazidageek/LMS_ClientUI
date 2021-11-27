import * as Yup from "yup";

const quizSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name should be minimum 3 chars long!")
    .max(30, "You have exceeded the limit chars!")
    .required("Required!"),

  deadline: Yup.date().required("Date is requrired!"),

  groupId: Yup.number().required(),

  hours: Yup.number()
  .typeError("Must be a number!")
  .min(0,"Hours can't be less than 0!")
  .max(24, "Hours can't be more than 24!")
  .required("Required!"),

  minutes: Yup.number()
  .typeError("Must be a number!")
  .min(0,"Minutes can't be less than 0!")
  .max(60, "Minutes can't be more than 60!")
  .required("Required!"),

  seconds: Yup.number()
  .typeError("Must be a number!")
  .min(0,"Seconds can't be less than 0!")
  .max(60, "Seconds can't be more than 60!")
  .required("Required!"),

});

export default quizSchema;
