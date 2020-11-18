import { Box, Typography } from '@material-ui/core';
import React, { Fragment } from 'react';
import { RouteKey, routes } from '../../app/config';
import { PageTitle } from '../../components/material-ui/typography';

interface Props { }

export const AssetsQueryPage: React.FC<Props> = () => {
  return (
    <Fragment>
      <PageTitle>{routes[RouteKey.ASSETS].title}</PageTitle>
      <Box component='span' m={1}>
        <Typography paragraph>
          Duis pulvinar nisl imperdiet tellus commodo, nec cursus erat hendrerit. Vivamus placerat metus tortor, id mattis velit luctus non. Mauris pretium sollicitudin dui ac viverra. Sed quis eros sit amet metus consequat condimentum. Praesent commodo risus quam, in tincidunt sapien auctor vel. Proin et rhoncus erat. Aenean quis condimentum orci. Morbi est quam, iaculis nec nisi vel, maximus semper ipsum.
      </Typography>
      </Box>
    </Fragment>
  );
}