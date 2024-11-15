import React from 'react';
import { Button as MuiButton } from '@material-ui/core';

export function Button({ label, onClick, color = 'primary', disabled = false, variant = 'outlined' }) {
    return (
        <MuiButton variant={variant} color={color} onClick={onClick} disabled={disabled}>
            {label}
        </MuiButton>
    );
}
