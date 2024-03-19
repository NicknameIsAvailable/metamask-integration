"use client"

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#2196f3',
        },
        secondary: {
            main: '#ff9800',
        },
        success: {
            main: '#4caf50',
        },
        warning: {
            main: '#ffc107',
        },
        error: {
            main: '#f44336',
        },
        info: {
            main: '#9c27b0',
        },
        background: {
            default: '#121212',
        },
        text: {
            primary: '#ffffff',
        },
    },
});

export default theme;
