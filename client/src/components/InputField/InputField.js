import React from 'react';
import { TextField } from '@mui/material';

const InputField = ({ label, onChange, ...other }) => {
  return (
    <div>
      <TextField label={label} onChange={onChange} {...other}>
        {label}
      </TextField>
    </div>
  );
};

export default InputField;
