import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Typography, Box } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { CustomersForm } from './CustomerForm';

export function CustomerDialog({ open, onClose, customer, refetch }) {
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (customer) {
            setIsEditing(true);
        } else {
            setIsEditing(false);
        }
    }, [customer]);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle
                style={{
                    backgroundColor: '#1976d2',
                    color: 'white',
                    textAlign: 'center',
                    position: 'relative',
                    paddingRight: 40,
                    overflow: 'hidden',
                }}
            >
                <Typography variant="h6">{isEditing ? 'Edit Customer' : 'Add New Customer'}</Typography>
                <IconButton edge="end" color="inherit" onClick={onClose} style={{ position: 'absolute', right: 8, top: 8 }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent style={{ padding: '20px' }}>
                <Box marginBottom={2}>
                    <Typography variant="body1" color="textSecondary">
                        {isEditing
                            ? 'Update the details of the customer.'
                            : 'Please fill in the details to add a new customer. All fields are required.'}
                    </Typography>
                </Box>
                <CustomersForm refetch={refetch} onClose={onClose} customer={customer} />
            </DialogContent>
        </Dialog>
    );
}
