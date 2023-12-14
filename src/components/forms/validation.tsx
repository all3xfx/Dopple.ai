import * as yup from "yup";

const shared = {
  password: yup.string().required().min(6),
};

export const signInSchema = yup
  .object({
    emailUsername: yup.string().required(),
    ...shared,
  })
  .required();

export const signUpSchema = yup
  .object({
    username: yup.string().required().min(5).max(12),
    email: yup.string().email().required(),
    ...shared,
  })
  .required();
