import React from 'react';

export function ErrorMessage({ message }) {
    return <p style={{ color: 'red' }}>Error: {message}</p>;
}
