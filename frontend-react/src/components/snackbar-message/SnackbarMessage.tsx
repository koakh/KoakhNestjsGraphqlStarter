import { makeStyles, Theme } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import React, { Dispatch, SetStateAction } from 'react';

const autoHideDuration= 6000;

export enum SnackbarSeverityType {
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
  SUCCESS = 'success',
}

interface Props {
  message: string;
  severity: SnackbarSeverityType;
  // pass useState references from outside
  open: boolean;
  setOpen: Dispatch<SetStateAction<any>>,
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export const SnackbarMessage: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  // const [open, setOpen] = React.useState(false);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    props.setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={props.open} autoHideDuration={autoHideDuration} onClose={handleClose}>
        <Alert onClose={handleClose} severity={props.severity}>
        {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
}