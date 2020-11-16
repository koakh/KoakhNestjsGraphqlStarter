import { Box } from '@material-ui/core';
import React, { Fragment } from 'react';
import { RouteKey, routes } from '../../app/config';
import { useStateValue } from '../../app/state';
import { AlertMessage, AlertSeverityType } from '../../components/material-ui/alert-message';
import { PageTitle } from '../../components/material-ui/typography';

interface Props { }

export const ResultPage: React.FC<Props> = () => {
  // get hook
  const [state] = useStateValue();

  return (
    <Fragment>
      <PageTitle>{routes[RouteKey.RESULT_PAGE].title}</PageTitle>
      <Box component='span' m={1}>
        <AlertMessage severity={AlertSeverityType.SUCCESS} message={state.resultMessage} />
      </Box>
    </Fragment>
  );
}