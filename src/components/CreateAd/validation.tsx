import * as Yup from 'yup';

export const CreateAdSchema = Yup.object().shape({
  imgSourceBase64: Yup.string().required('Required'),
  mark: Yup.string().required('Required'),
  model: Yup.string().required('Required'),
  fuel: Yup.string().required('Required'),
  doors: Yup.number()
  .min(2, 'Fix doors count!')
  .max(8, 'Fix doors count!')
  .required('Required'),
  transmission: Yup.string().required('Required'),
  seats: Yup.number()
  .min(2, 'Fix seats count!')
  .max(8, 'Fix seats count!')
  .required('Required'),
  baggageCapacity: Yup.number()
  .min(0, 'Fix baggage capacity count!')
  .max(20, 'Fix baggage capacity count!')
  .required('Required'),
  capacity: Yup.number()
  .min(1, 'Fix capacity count!')
  .max(12, 'Fix capacity count!')
  .required('Required'),
});