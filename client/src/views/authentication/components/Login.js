import * as React from 'react';
import { Avatar, Grid, CssBaseline, Box, Container, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { ErrorMessage, Form, Field, Formik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';

import Controls from '../../../components/Controls';
import { login } from '../../../redux/actions/authActions';

const theme = createTheme();

const Login = () => {
  const classes = '';
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const errorNotify = (message) => {
    enqueueSnackbar(message, {
      variant: 'error',
    });
  };
  const reduxState = useSelector((state) => state, shallowEqual);

  const initialValues = {
    email: '',
    password: '',
  };
  const schema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string().required('Password is required'),
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />

        <div style={{ marginTop: '10rem' }}>
          <center>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Controls.Titles component='h1' variant='h5' label='Sign In' />
          </center>

          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={async (values, { resetForm }) => {
              let data = { email: values.email, password: values.password };
              await dispatch(login(data)).then((res) => {
                const message = res.response.data.errors.map((err) => err.msg);
                errorNotify(message);
              });
              resetForm();
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Field
                  label='Email Address'
                  name='email'
                  margin='normal'
                  fullWidth
                  as={Controls.InputField}
                  error={Boolean(touched.email && errors.email)}
                  helperText={<ErrorMessage name='email' />}
                  FormHelperTextProps={{
                    className: classes.error,
                  }}
                />

                <Field
                  name='password'
                  label='Password'
                  margin='normal'
                  type='password'
                  fullWidth
                  as={Controls.InputField}
                  error={Boolean(touched.password && errors.password)}
                  helperText={<ErrorMessage name='password' />}
                  FormHelperTextProps={{
                    className: classes.error,
                  }}
                />

                <Controls.ButtonInput
                  label='Sign In'
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                />
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
