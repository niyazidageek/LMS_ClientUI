import * as Yup from "yup";

const resetPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address!").required("Required!"),

  newPassword: Yup.string()
    .required("No password provided!")
    .min(7, "Password is too short - should be 7 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),

  confirmNewPassword: Yup.string()
    .required("No password provided!")
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match!"),

  token: Yup.string()
    .required("Required")
    .min(6, "Your secret key must be 6 characters long!")
    .max(6, "Your secret key must be 6 characters long!"),
});

export default resetPasswordSchema;
