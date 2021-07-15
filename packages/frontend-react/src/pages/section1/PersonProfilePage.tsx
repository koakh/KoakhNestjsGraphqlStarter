import Box from '@material-ui/core/Box';
import React, { Fragment } from 'react';
import { envVariables as e } from '../../app/config/env';
import { AlertMessage, AlertSeverityType } from '../../components/material-ui/alert-message';
import { LinearIndeterminate } from '../../components/material-ui/feedback';
import { usePersonProfileQuery } from '../../generated/graphql';
import { PageTitle } from '../../components/material-ui/typography';
import { routes, RouteKey } from '../../app/config';

interface Props { }

export const PersonProfilePage: React.FC<Props> = () => {
  const { data, loading, error } = usePersonProfileQuery({
    fetchPolicy: e.apolloFetchPolicy
  });

  if (error) {
    return <AlertMessage severity={AlertSeverityType.ERROR} message={error.message} />;
  }

const pageTitle = <PageTitle>{routes[RouteKey.PROFILE].title}</PageTitle>;
  if (loading || !data) {
    return (
      <Fragment>
        {pageTitle}
        <LinearIndeterminate />
      </Fragment>
    );
  }

  const { personProfile } = data;
  return (
    <Fragment>
      {pageTitle}
      <Box component='span' m={1}>
        <pre>{JSON.stringify(personProfile, undefined, 2)}</pre>
      </Box>
    </Fragment>
  );
}