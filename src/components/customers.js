import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
} from "@material-ui/core";
import { CustomerDialog } from "./customerDialog";

// GraphQL query to fetch customer details
export const GET_CUSTOMERS = gql`
  {
    Customers {
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

export function Customers() {
  const { loading, error, data, refetch } = useQuery(GET_CUSTOMERS);

  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error.message}</p>;

  return (
    <div id="viewCustomers">
      <Typography variant="h5" gutterBottom>
        LIST OF CUSTOMERS
      </Typography>

      <Button variant="outlined" color="primary" onClick={handleDialogOpen}>
        Add Human
      </Button>

      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Second Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.Customers.map((customer) => (
              <TableRow key={customer.ID}>
                <TableCell>{customer.FullName}</TableCell>
                <TableCell>{customer.FirstName}</TableCell>
                <TableCell>{customer.SecondName}</TableCell>
                <TableCell>{customer.LastName}</TableCell>
                <TableCell>{customer.Email}</TableCell>
                <TableCell>{customer.Date}</TableCell>
                <TableCell>{customer.Location}</TableCell>
                <TableCell>{customer.Description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <CustomerDialog open={openDialog} onClose={handleDialogClose} refetch={refetch} />
    </div>
  );
}
