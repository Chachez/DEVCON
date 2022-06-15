import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  DialogContentText,
  Slide,
  DialogActions,
  makeStyles,
} from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: 'absolute',
    borderRadius: theme.spacing(2),
    // top: theme.spacing(5)
  },
  dialogTitle: {
    paddingRight: '0px',
    textTransform: 'uppercase',
    fontWeight: 'bolder',
  },
  dialogContext: {
    paddingLeft: '20px',
  },
  dialogButton: {
    margin: theme.spacing(0.5),
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const Popup = ({
  title,
  children,
  openPopup,
  setOpenPopup,
  contextText,
  maxWidth,
  titleCenter,
  onClick,
  isLoading,
  actions,
  ...other
}) => {
  const classes = useStyles();

  return (
    <Dialog
      TransitionComponent={Transition}
      open={openPopup}
      maxWidth={maxWidth || 'sm'}
      fullWidth
      centered
      classes={{ paper: classes.dialogWrapper }}
      {...other}
    >
      <DialogTitle
        className={classes.dialogTitle}
        align={titleCenter || 'center'}
      >
        <div style={{ display: 'flex' }}>
          <Typography variant='h6' component='div' style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Button
            color='secondary'
            onClick={() => {
              setOpenPopup(false);
            }}
          >
            <CloseIcon />
          </Button>
        </div>
      </DialogTitle>
      <DialogContentText className={classes.dialogContext}>
        {contextText}
      </DialogContentText>
      <DialogContent>{children}</DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
};

export default Popup;
