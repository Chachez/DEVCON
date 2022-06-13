import React from 'react';
import { Typography } from '@mui/material';

const Titles = ({ component, variant, label, ...others }) => {
  return (
    <div>
      <Typography variant={variant} component={component} {...others}>
        {label}
      </Typography>
    </div>
  );
};

export default Titles;
