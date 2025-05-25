import * as yup from 'yup';

export const UpdateSchema = yup.object().shape({
    username: yup.string().min(3).max(30).trim(),
    email: yup.string().email("Please enter a valid email").lowercase().trim(),
    number: yup.string().min(10).max(10).trim(),
    password: yup.string().min(6).required("current password required"),
})