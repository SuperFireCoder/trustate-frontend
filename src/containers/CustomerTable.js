import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

export function CustomerTable({ customers }) {
    return (
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
                    {customers.map((customer) => (
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
    );
}
