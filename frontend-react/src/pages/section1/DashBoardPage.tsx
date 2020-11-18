import React, { Fragment } from 'react';
import { Typography, Box } from '@material-ui/core';
import { PageTitle } from '../../components/material-ui/typography';
import { RouteKey, routes } from '../../app/config';

interface Props { }

export const DashBoardPage: React.FC<Props> = () => {
  return (
    <Fragment>
      <PageTitle>{routes[RouteKey.DASHBOARD].title}</PageTitle>
      <Box component='span' m={1}>
        <Typography paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras interdum ante quis augue tristique feugiat. Nam enim odio, ultrices id volutpat dapibus, lobortis a erat. Suspendisse tincidunt tristique ante sed imperdiet. Praesent eget faucibus elit, in facilisis leo. Proin porttitor, erat ac ultrices elementum, mauris ex suscipit erat, id tincidunt justo augue ac justo. Mauris gravida libero vel lacus rutrum, in sagittis tellus egestas. Morbi vulputate arcu nec egestas maximus. Cras pretium neque ac odio condimentum, at viverra sem egestas. Morbi a odio et lectus posuere ornare.
      </Typography>
      </Box>
    </Fragment>
  );
}