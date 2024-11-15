import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_CUSTOMERS } from '../graphql/queries';
import { CustomerTable } from './CustomerTable';
import { CustomerDialog } from './CustomerDialog';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';
import { Button } from '../components/Button';

export function Customers() {
    const { loading, error, data, refetch } = useQuery(GET_CUSTOMERS);
    const [openDialog, setOpenDialog] = useState(false);

    const handleDialogOpen = () => setOpenDialog(true);
    const handleDialogClose = () => setOpenDialog(false);

    if (loading) return <Loading />;
    if (error) return <ErrorMessage message={error.message} />;

    return (
        <div style={{ padding: '20px' }}>
            <Button label="Add Customer" onClick={handleDialogOpen} />

            <CustomerTable customers={data.Customers} />

            <CustomerDialog open={openDialog} onClose={handleDialogClose} refetch={refetch} />
        </div>
    );
}
