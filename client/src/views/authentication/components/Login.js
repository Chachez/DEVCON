import * as React from 'react';
import {
  Avatar,
  Grid,
  CssBaseline,
  Container,
  Link,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { ErrorMessage, Form, Field, Formik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';

import Controls from '../../../components/Controls';
import { login } from '../../../redux/actions/authActions';

const Copyright = (props) => {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link color='inherit' href='#'>
        Michael's Site
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

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
  console.log(reduxState);
  const navigate = useNavigate();

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
                navigate('/');
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
                <Grid container>
                  <Grid item xs>
                    <Link href='#' variant='body2'>
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href='#' variant='body2'>
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>{' '}
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
