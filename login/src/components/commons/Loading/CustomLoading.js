import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react'; 
const CustomLoading = props => {
    const { loading } = props;
    return (
        <Backdrop open={loading} sx={{
            zIndex: 1300,
            color: '#fff'
        }} >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};
export default CustomLoading;