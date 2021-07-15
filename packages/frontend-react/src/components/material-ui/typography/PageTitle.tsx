import React from 'react';
import Typography from '@material-ui/core/Typography';

interface Props {  }

export const PageTitle: React.FC<Props> = (props) => {
  return (
    <Typography variant='h4'>{props.children}</Typography>
  );
};