import React from "react";
import { Dialog, DialogContent, DialogTitle, IconButton, Typography, Box } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { CustomersForm } from "./customerForm";

export function CustomerDialog({ open, onClose, refetch }) {
    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle
                style={{
                    backgroundColor: "#1976d2",
                    color: "white",
                    textAlign: "center",
                    position: "relative",
                    paddingRight: 40,
                    overflow: "hidden",
                }}>
                <Typography variant="h6">
                    Add New Human
                </Typography>

                <IconButton
                    edge="end"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                    style={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent style={{ padding: "20px" }}>
                <Box marginBottom={2}>
                    <Typography variant="body1" color="textSecondary">
                        Please fill in the details to add a new customer. All fields are required.
                    </Typography>
                </Box>
                <CustomersForm refetch={refetch} onClose={onClose} />
            </DialogContent>
        </Dialog>
    );
}
