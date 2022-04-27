import * as Yup from 'yup';

export const SearchSchema = Yup.object().shape({
  rentDate: Yup.string().required('Required'),
  rentTime: Yup.string().required('Required'),
  customerPhone: Yup.string().min(10, 'Too short!').required('Required'),
});
