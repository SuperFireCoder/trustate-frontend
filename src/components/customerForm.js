import React from "react";
import gql from "graphql-tag";
import Button from "@material-ui/core/Button";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";
import { useMutation } from "@apollo/react-hooks";
import { GET_CUSTOMERS } from "./customers";

const ADD_CUSTOMER = gql`
  mutation CreateCustomer(
    $FullName: String
    $FirstName: String
    $SecondName: String
    $LastName: String
    $Email: String
    $Date: String
    $Location: String
    $Description: String
  ) {
    CreateCustomer(
      FullName: $FullName
      FirstName: $FirstName
      SecondName: $SecondName
      LastName: $LastName
      Email: $Email
      Date: $Date
      Location: $Location
      Description: $Description
    ) {
      ID
      FullName
      FirstName
      SecondName
      LastName
      Email
      Date
      Location
      Description
    }
  }
`;

export function CustomersForm({ onClose, refetch }) {
  const [addCustomer, { data, loading, error }] = useMutation(ADD_CUSTOMER, {
    refetchQueries: [{ query: GET_CUSTOMERS }]
  });
  console.log(data, loading, error);

  return (
    <div id="customerForm">
      <Formik
        initialValues={{
          FirstName: "",
          SecondName: "",
          LastName: "",
          Email: "",
          Date: "",
          Location: "",
          Description: ""
        }}
        validationSchema={Yup.object().shape({
          FirstName: Yup.string()
            .required("First Name is required")
            .min(2, 'First Name must be at least 2 characters'),
          SecondName: Yup.string()
            .required("Second Name is required")
            .min(2, 'Second Name must be at least 2 characters'),
          LastName: Yup.string()
            .required("Last Name is required")
            .min(2, 'Last Name must be at least 2 characters'),
          Email: Yup.string()
            .email("Email is invalid")
            .required("Email is required"),
          Date: Yup.string().required("Date is required"),
          Location: Yup.string().required("Location is required"),
          Description: Yup.string().required("Description is required")
        })}
        onSubmit={async (fields, { resetForm }) => {
          try {
            await addCustomer({
              variables: {
                ...fields,
                FullName: `${fields.FirstName} ${fields.SecondName} ${fields.LastName}`,
              },
            });
            resetForm();
            onClose();
          } catch (err) {
            console.error("Error creating customer:", err);
            alert('Error adding customer. Please try again.');
          }
        }}
        render={({ errors, status, touched }) => (
          <Form>
            <Field
              label="First Name"
              name="FirstName"
              type="text"
              component={TextField}
              margin="none"
              variant="outlined"
              fullWidth
            />
            <Field
              label="Second Name"
              name="SecondName"
              type="text"
              component={TextField}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <Field
              label="Last Name"
              name="LastName"
              type="text"
              component={TextField}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <Field
              label="Email"
              name="Email"
              type="text"
              component={TextField}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <Field
              name="Date"
              type="date"
              component={TextField}
              margin="normal"
              variant="outlined"
              fullWidth
              error={touched.Date && Boolean(errors.Date)}
              helperText={touched.Date && errors.Date}
            />
            <Field
              label="Location"
              name="Location"
              type="text"
              component={TextField}
              margin="normal"
              variant="outlined"
              fullWidth
              error={touched.Location && Boolean(errors.Location)}
              helperText={touched.Location && errors.Location}
            />
            <Field
              label="Description"
              name="Description"
              type="text"
              component={TextField}
              margin="normal"
              variant="outlined"
              fullWidth
              error={touched.Description && Boolean(errors.Description)}
              helperText={touched.Description && errors.Description}
            />
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Register'}
            </Button>{" "}
            <Button type="reset" variant="outlined" color="secondary">
              Reset
            </Button>

            {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
          </Form>
        )}
      ></Formik>
    </div>
  );
}
