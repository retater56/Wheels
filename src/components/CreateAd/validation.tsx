import * as Yup from 'yup';

export const CreateAdSchema = Yup.object().shape({
  imgSourceBase64: Yup.string().required('Required'),
  mark: Yup.string().required('Required'),
  model: Yup.string().required('Required'),
  fuel: Yup.string().required('Required'),
  vehicleType: Yup.string().required('Required'),
  transmission: Yup.string().required('Required'),
  seats: Yup.number()
    .min(2, 'Fix seats count!')
    .max(8, 'Fix seats count!')
    .required('Required'),
  maxSpeed: Yup.number()
    .min(45, 'Fix minimum spped!')
    .max(450, 'Fix maximum spped!')
    .required('Required'),
  capacity: Yup.number()
    .min(0, 'Fix capacity count!')
    .max(100, 'Fix capacity count!')
    .required('Required'),
  cost: Yup.number().min(1, 'Fix cost!').required('Required'),
  position: Yup.string().required('Required'),
  description: Yup.string().min(10, 'Too short!').required('Required'),
});
