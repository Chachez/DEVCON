import React from 'react';
import { Typography } from '@mui/material';

const Titles = ({ component, variant, label, ...other }) => {
  return (
    <div>
      <Typography variant={variant} component={component}>
        {label}
      </Typography>
    </div>
  );
};

export default Titles;
