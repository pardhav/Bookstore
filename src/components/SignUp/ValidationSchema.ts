import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  "given-name": Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
  "family-name": Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().required("Email is Required").email("Invalid email"),
  password: Yup.string()
    .min(8, "Must be at least 8 charecters")
    .required("Password is Required")
    .matches(/^[aA-zZ\s]+$/, "Password can contain only alphabets or numbers"),
  "tel-national": Yup.number().required("Mobile Number is required").positive(),
});

export default SignupSchema;