import * as yup from 'yup';

export const reviewValidationSchema = yup.object().shape({
  rating: yup.number().integer(),
  comment: yup.string(),
  company_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
