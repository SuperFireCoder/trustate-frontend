import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Menu, MenuItem } from '@material-ui/core';
import { MoreVert as MoreVertIcon, Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';

export function CustomerTable({ customers, onDelete, onUpdate }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const handleClick = (event, customer) => {
        setAnchorEl(event.currentTarget);
        setSelectedCustomer(customer);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedCustomer(null);
    };

    const handleDelete = () => {
        onDelete(selectedCustomer.ID);
        handleClose();
    };

    const handleUpdate = () => {
        onUpdate(selectedCustomer);
        handleClose();
    };

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
                        <TableCell>Actions</TableCell>
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
                            <TableCell>
                                <IconButton onClick={(e) => handleClick(e, customer)}>
                                    <MoreVertIcon />
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleUpdate}>
                                        <EditIcon style={{ marginRight: 8 }} />
                                        Update
                                    </MenuItem>
                                    <MenuItem onClick={handleDelete}>
                                        <DeleteIcon style={{ marginRight: 8 }} />
                                        Delete
                                    </MenuItem>
                                </Menu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
