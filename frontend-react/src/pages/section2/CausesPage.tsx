import React, { Fragment } from 'react';
import { Typography, Box } from '@material-ui/core';
import { PageTitle } from '../../components/material-ui/typography';

interface Props { }

export const CausesPage: React.FC<Props> = () => {
  return (
    <Fragment>
      <PageTitle>Causes</PageTitle>
      <Box component='span' m={1}>
        <Typography paragraph>
          Nullam facilisis sodales est. Donec augue magna, rhoncus ac velit in, pellentesque mattis velit. Vestibulum dignissim
          ullamcorper ornare. Aliquam pellentesque sed sapien in feugiat. Curabitur lacinia porta velit, nec auctor ante molestie ac.
          Suspendisse condimentum non nulla nec tempus. Cras gravida finibus dignissim. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Typography>
      </Box>
    </Fragment>
  );
}