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
  className?: string;
}

export const AlertMessage: React.FC<Props> = ({title, message, severity, className}) => {
  return (
    <Alert severity={severity} className={className}>
      {title && <AlertTitle>{title}</AlertTitle>}
      {message}
    </Alert>
  )
}
