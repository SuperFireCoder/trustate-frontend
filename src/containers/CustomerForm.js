import React from 'react';
import { Box } from '@material-ui/core';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import { GET_CUSTOMERS } from '../graphql/queries';
import { ADD_CUSTOMER } from '../graphql/mutations';
import { ErrorMessage } from '../components/ErrorMessage';
import { Button } from '../components/Button';

export function CustomersForm({ onClose, refetch }) {
    const [addCustomer, { loading, error }] = useMutation(ADD_CUSTOMER, {
        refetchQueries: [{ query: GET_CUSTOMERS }],
    });

    return (
        <Formik
            initialValues={{
                FirstName: '',
                SecondName: '',
                LastName: '',
                Email: '',
                Date: '',
                Location: '',
                Description: '',
            }}
            validationSchema={Yup.object().shape({
                FirstName: Yup.string().required('First Name is required'),
                SecondName: Yup.string().required('Second Name is required'),
                LastName: Yup.string().required('Last Name is required'),
                Email: Yup.string().email('Email is invalid').required('Email is required'),
                Date: Yup.string().required('Date is required'),
                Location: Yup.string().required('Location is required'),
                Description: Yup.string().required('Description is required'),
            })}
            onSubmit={async (fields, { resetForm }) => {
                try {
                    await addCustomer({ variables: { ...fields, FullName: `${fields.FirstName} ${fields.SecondName} ${fields.LastName}` } });
                    resetForm();
                    onClose();
                    refetch();
                } catch (err) {
                    console.error(err);
                }
            }}
        >
            <Form>
                <Field component={TextField} name="FirstName" label="First Name" fullWidth margin="normal" />
                <Field component={TextField} name="SecondName" label="Second Name" fullWidth margin="normal" />
                <Field component={TextField} name="LastName" label="Last Name" fullWidth margin="normal" />
                <Field component={TextField} name="Email" label="Email" fullWidth margin="normal" />
                <Field component={TextField} name="Date" label="Date" fullWidth margin="normal" />
                <Field component={TextField} name="Location" label="Location" fullWidth margin="normal" />
                <Field component={TextField} name="Description" label="Description" fullWidth margin="normal" />
                <Box marginTop={2}>
                    <Button label="Save" type="submit" disabled={loading} />
                </Box>
                {error && <ErrorMessage message={error.message} />}
            </Form>
        </Formik>
    );
}
