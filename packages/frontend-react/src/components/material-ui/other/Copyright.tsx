import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

export interface Props {
  copyrightName: string;
  copyrightUri: string;
}

export const Copyright: React.FC<Props> = (props) => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href={props.copyrightUri}>
        {props.copyrightName}
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
};