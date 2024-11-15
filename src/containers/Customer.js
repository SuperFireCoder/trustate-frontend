import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_CUSTOMERS } from '../graphql/queries';
import { DELETE_CUSTOMER } from '../graphql/mutations';
import { CustomerTable } from './CustomerTable';
import { CustomerDialog } from './CustomerDialog';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';
import { Button } from '../components/Button';

export function Customers() {
    const { loading, error, data, refetch } = useQuery(GET_CUSTOMERS);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [deleteCustomer] = useMutation(DELETE_CUSTOMER);

    const handleDialogOpen = (customer = null) => {
        setSelectedCustomer(customer);
        setOpenDialog(true);
    };
    const handleDialogClose = () => setOpenDialog(false);

    const handleDelete = async (customerID) => {
        try {
            await deleteCustomer({ variables: { ID: customerID } });
            refetch();
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdate = (customer) => {
        handleDialogOpen(customer);
    };

    if (loading) return <Loading />;
    if (error) return <ErrorMessage message={error.message} />;

    return (
        <div style={{ padding: '20px' }}>
            <Button label="Add Customer" onClick={() => handleDialogOpen()} />

            <CustomerTable
                customers={data.Customers}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
            />
            <CustomerDialog
                open={openDialog}
                onClose={handleDialogClose}
                customer={selectedCustomer}
                refetch={refetch}
            />
        </div>
    );
}
