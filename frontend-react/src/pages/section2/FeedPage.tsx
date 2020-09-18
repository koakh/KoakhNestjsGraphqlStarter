import React, { Fragment } from 'react';
import { Typography, Box } from '@material-ui/core';
import { PageTitle } from '../../components/material-ui/typography';

interface Props { }

export const FeedPage: React.FC<Props> = () => {
  return (
    <Fragment>
      <PageTitle>Feed</PageTitle>
      <Box component='span' m={1}>
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