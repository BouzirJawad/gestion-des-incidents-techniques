import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const registerSchema = yup.object().shape({
  username: yup.string().min(3).max(30).trim().required("Required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .lowercase()
    .trim()
    .required("Required"),
  isAdmin: yup.boolean().required("Required"),
  number: yup.string().min(10).max(10).trim().required("Required"),
  password: yup
    .string()
    .min(6)
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match")
    .required("Required"),
});
