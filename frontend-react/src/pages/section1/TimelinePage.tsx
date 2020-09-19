import React, { Fragment } from 'react';
import { Typography, Box } from '@material-ui/core';
import { PageTitle } from '../../components/material-ui/typography';
import { RouteKey, routes } from '../../app/config';

interface Props { }

export const TimelinePage: React.FC<Props> = () => {
  return (
    <Fragment>
      <PageTitle>{routes[RouteKey.TIMELINE].title}</PageTitle>
      <Box component='span' m={1}>
        <Typography paragraph>
          receive all models, person, participant, etc, create a subscription common for all models
      </Typography>
      </Box>
    </Fragment>
  );
}