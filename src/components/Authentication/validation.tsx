import * as Yup from 'yup';

export const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Required'),
  password: Yup.string().required('Required'),
});

export const RegistrationSchema = Yup.object().shape({
    userName: Yup.string().min(2, 'Too short!').required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required'),
  });