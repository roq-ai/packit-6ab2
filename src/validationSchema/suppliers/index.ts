import * as yup from 'yup';

export const supplierValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  company_id: yup.string().nullable(),
});
