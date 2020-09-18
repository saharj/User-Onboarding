import * as yup from "yup";

let formSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required().email("Must be a valid email address."),
  password: yup
    .string()
    .min(6, "Passwords must be at least 6 characters long.")
    .required("Password is Required"),
  terms: yup.boolean().oneOf([true], "Do you accept our Terms and Conditions?"),
});

export default formSchema;
