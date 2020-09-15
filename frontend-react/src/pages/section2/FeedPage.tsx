import * as React from 'react';
import { Typography, Box } from '@material-ui/core';
import { Fragment } from 'react';

interface Props { }

export const FeedPage: React.FC<Props> = () => {
  return (
    <Fragment>
      <Typography variant="h6" noWrap>
        Feed
      </Typography>
      <Box color="text.primary" clone>
        <Typography paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor nisi nulla, eu ultricies turpis facilisis a. 
        Vivamus fermentum in risus ut laoreet. Sed hendrerit fringilla rhoncus. Aliquam mi nisl, consectetur a ultricies sed, eleifend 
        vitae mi. Aliquam erat volutpat. Praesent aliquet massa sit amet tincidunt pulvinar. Aliquam sit amet tincidunt felis, 
        quis tincidunt urna. Cras imperdiet tortor mattis, semper ante sed, imperdiet lacus. Pellentesque sit amet risus quam.
      </Typography>
      </Box>
    </Fragment>
  );
}