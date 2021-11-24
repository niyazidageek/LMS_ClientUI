import * as Yup from "yup";

const joinVideoChatSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name should be minimum 3 chars long!")
    .max(30, "You have exceeded the limit chars!")
    .required("Required!")
});

export default joinVideoChatSchema;
