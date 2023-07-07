import * as yup from 'yup';

export const catalogValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  recyclability: yup.boolean(),
  compostability: yup.boolean(),
  reduced_carbon_footprint: yup.boolean(),
  company_id: yup.string().nullable(),
});
