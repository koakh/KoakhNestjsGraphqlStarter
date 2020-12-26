import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import React, { Fragment } from 'react';
import { PageTitle } from '../../components/material-ui/typography';
import { RouteKey, routes } from '../../app/config';

interface Props { }

export const HomePage: React.FC<Props> = () => {
  return (
    <Fragment>
      <PageTitle>{routes[RouteKey.HOME].title}</PageTitle>
      <Box component='span' m={1}>
        <Typography paragraph>
          SolidaryChain is a network, a social movement based on an open governance concept and open-source technology, with focus on transparency, integrity, and equity.
        </Typography>
      </Box>
    </Fragment>
  );
}