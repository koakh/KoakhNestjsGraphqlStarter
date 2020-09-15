import * as React from 'react';
import { Typography, Box } from '@material-ui/core';
import { Fragment } from 'react';

interface Props { }

export const CausesPage: React.FC<Props> = () => {
  return (
    <Fragment>
      <Typography variant="h6" noWrap>
        Causes
      </Typography>
      <Box color="text.primary" clone>
        <Typography paragraph>
        Nullam facilisis sodales est. Donec augue magna, rhoncus ac velit in, pellentesque mattis velit. Vestibulum dignissim 
        ullamcorper ornare. Aliquam pellentesque sed sapien in feugiat. Curabitur lacinia porta velit, nec auctor ante molestie ac. 
        Suspendisse condimentum non nulla nec tempus. Cras gravida finibus dignissim. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Typography>
      </Box>
    </Fragment>
  );
}