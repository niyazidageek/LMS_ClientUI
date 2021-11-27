import * as Yup from "yup";

const signUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, "Should be 5 character long!")
    .max(15, "should not exceed 15 characters!")
    .required("Required!"),

  surname: Yup.string()
    .min(5, "Should be 5 character long!")
    .max(15, "should not exceed 15 characters!")
    .required("Required!"),

  username: Yup.string()
    .min(5, "Should be 5 character long!")
    .max(15, "should not exceed 15 characters!")
    .required("Required!"),

  email: Yup.string().email("Invalid email address!").required("Required!"),

  password: Yup.string()
    .required("No password provided!")
    .min(7, "Password is too short - should be 7 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),

  confirmPassword: Yup.string()
    .required("No password provided")
    .oneOf([Yup.ref("password"), null], "Passwords must match!"),
});

export default signUpSchema;
