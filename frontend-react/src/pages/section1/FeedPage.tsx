import { Box } from '@material-ui/core';
import React, { Fragment } from 'react';
import { RouteKey, routes } from '../../app/config';
import { DynamicGraph } from '../../components/force-graph';
import { PageTitle } from '../../components/material-ui/typography';

interface Props { }

export const FeedPage: React.FC<Props> = () => {
  // context state hook
  return (
    <Fragment>
      <PageTitle>{routes[RouteKey.FEED].title}</PageTitle>
      {/* extra margin, with this progress bar will not be pixel perfect */}
      {/* <Box component='span' m={1}> */}
        <DynamicGraph/>
      {/* </Box> */}
    </Fragment>
  );
}