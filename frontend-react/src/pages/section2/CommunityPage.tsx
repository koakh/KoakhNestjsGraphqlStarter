import * as React from 'react';
import { Typography, Box } from '@material-ui/core';
import { Fragment } from 'react';

interface Props { }

export const CommunityPage: React.FC<Props> = () => {
  return (
    <Fragment>
      <Typography variant="h6" noWrap>
        Community
      </Typography>
      <Box color="text.primary" clone>
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