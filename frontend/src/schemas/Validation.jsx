import * as yup from "yup";

const userSchema = yup.object().shape({
  name: yup.string().min(3).max(25).required("Name is required..."),
  email: yup.string().email().required("Email is required..."),
  phone: yup.number().positive().required("Phone number is required..."),
  position: yup.number().positive().required("Mention your Index position ..."),
});

export default userSchema;
