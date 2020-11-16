import React from 'react';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

export enum AlertSeverityType {
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
  SUCCESS = 'success',
}

interface Props {
  title?: string;
  message: string;
  severity: AlertSeverityType;
}

export const AlertMessage: React.FC<Props> = (props: Props) => {
  return (
    <Alert severity={props.severity}>
      {props.title && <AlertTitle>{props.title}</AlertTitle>}
      {props.message}
    </Alert>
  )
}
