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
        Donec viverra dolor aliquam sapien eleifend, faucibus vulputate massa luctus. Phasellus non pharetra neque. Vestibulum consectetur vehicula iaculis. Fusce imperdiet risus quis ipsum fermentum, a viverra tortor blandit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. 
      </Typography>
      </Box>
    </Fragment>
  );
}