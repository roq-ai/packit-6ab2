import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createCatalog } from 'apiSdk/catalogs';
import { Error } from 'components/error';
import { catalogValidationSchema } from 'validationSchema/catalogs';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { CompanyInterface } from 'interfaces/company';
import { getCompanies } from 'apiSdk/companies';
import { CatalogInterface } from 'interfaces/catalog';

function CatalogCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: CatalogInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createCatalog(values);
      resetForm();
      router.push('/catalogs');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<CatalogInterface>({
    initialValues: {
      name: '',
      description: '',
      recyclability: false,
      compostability: false,
      reduced_carbon_footprint: false,
      company_id: (router.query.company_id as string) ?? null,
    },
    validationSchema: catalogValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Catalog
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="name" mb="4" isInvalid={!!formik.errors?.name}>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" value={formik.values?.name} onChange={formik.handleChange} />
            {formik.errors.name && <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="description" mb="4" isInvalid={!!formik.errors?.description}>
            <FormLabel>Description</FormLabel>
            <Input type="text" name="description" value={formik.values?.description} onChange={formik.handleChange} />
            {formik.errors.description && <FormErrorMessage>{formik.errors?.description}</FormErrorMessage>}
          </FormControl>
          <FormControl
            id="recyclability"
            display="flex"
            alignItems="center"
            mb="4"
            isInvalid={!!formik.errors?.recyclability}
          >
            <FormLabel htmlFor="switch-recyclability">Recyclability</FormLabel>
            <Switch
              id="switch-recyclability"
              name="recyclability"
              onChange={formik.handleChange}
              value={formik.values?.recyclability ? 1 : 0}
            />
            {formik.errors?.recyclability && <FormErrorMessage>{formik.errors?.recyclability}</FormErrorMessage>}
          </FormControl>
          <FormControl
            id="compostability"
            display="flex"
            alignItems="center"
            mb="4"
            isInvalid={!!formik.errors?.compostability}
          >
            <FormLabel htmlFor="switch-compostability">Compostability</FormLabel>
            <Switch
              id="switch-compostability"
              name="compostability"
              onChange={formik.handleChange}
              value={formik.values?.compostability ? 1 : 0}
            />
            {formik.errors?.compostability && <FormErrorMessage>{formik.errors?.compostability}</FormErrorMessage>}
          </FormControl>
          <FormControl
            id="reduced_carbon_footprint"
            display="flex"
            alignItems="center"
            mb="4"
            isInvalid={!!formik.errors?.reduced_carbon_footprint}
          >
            <FormLabel htmlFor="switch-reduced_carbon_footprint">Reduced Carbon Footprint</FormLabel>
            <Switch
              id="switch-reduced_carbon_footprint"
              name="reduced_carbon_footprint"
              onChange={formik.handleChange}
              value={formik.values?.reduced_carbon_footprint ? 1 : 0}
            />
            {formik.errors?.reduced_carbon_footprint && (
              <FormErrorMessage>{formik.errors?.reduced_carbon_footprint}</FormErrorMessage>
            )}
          </FormControl>
          <AsyncSelect<CompanyInterface>
            formik={formik}
            name={'company_id'}
            label={'Select Company'}
            placeholder={'Select Company'}
            fetcher={getCompanies}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'catalog',
    operation: AccessOperationEnum.CREATE,
  }),
)(CatalogCreatePage);
