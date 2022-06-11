import React from 'react';
import { Button } from '@mui/material';

const ButtonInput = ({ variant, label, onClick, ...other }) => {
  return (
    <div>
      <Button variant={variant} onClick={onClick} {...other}>
        {label}
      </Button>
    </div>
  );
};

export default ButtonInput;
