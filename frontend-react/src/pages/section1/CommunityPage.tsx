import React, { Fragment } from 'react';
import { Typography, Box } from '@material-ui/core';
import { PageTitle } from '../../components/material-ui/typography';
import { routes, RouteKey } from '../../app/config';

interface Props { }

export const CommunityPage: React.FC<Props> = () => {
  return (
    <Fragment>
      <PageTitle>{routes[RouteKey.COMMUNITY].title}</PageTitle>
      <Box component='span' m={1}>
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elementum convallis vulputate. Phasellus consectetur, lectus
          non volutpat hendrerit, tortor elit tincidunt ligula, vitae scelerisque lorem tellus laoreet quam. Nullam ultricies orci lorem,
          non pharetra leo placerat non. Aenean egestas, dolor non convallis dapibus, neque odio mollis risus, vitae iaculis nunc sem ac dui.
          Pellentesque lectus lorem, eleifend ut quam quis, varius pellentesque urna. Cras vel velit non quam tempus imperdiet. Ut et ante
          nec elit feugiat faucibus id sagittis leo. Sed vitae scelerisque ipsum. Fusce scelerisque facilisis rutrum.
        </Typography>
      </Box>
    </Fragment>
  );
}