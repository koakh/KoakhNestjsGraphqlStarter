import { Box, Typography } from '@material-ui/core';
import React, { Fragment } from 'react';
import { RouteKey, routes } from '../../app/config';
import { PageTitle } from '../../components/material-ui/typography';

interface Props { }

export const ParticipantsQueryPage: React.FC<Props> = () => {
  return (
    <Fragment>
      <PageTitle>{routes[RouteKey.PARTICIPANTS].title}</PageTitle>
      <Box component='span' m={1}>
        <Typography paragraph>
        Curabitur a sollicitudin lectus. Donec malesuada dolor at dolor elementum consequat. Fusce nisl lectus, luctus ac mauris vitae, tristique accumsan nulla. Nunc fringilla sapien nunc, ac faucibus metus ultricies vel. Donec in velit ut massa semper maximus. Mauris fermentum venenatis sem, quis placerat arcu venenatis luctus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed tempor massa arcu, sit amet condimentum ex tempus quis. Suspendisse a ornare lorem, ut maximus nibh. Nulla vitae placerat quam.
      </Typography>
      </Box>
    </Fragment>
  );
}