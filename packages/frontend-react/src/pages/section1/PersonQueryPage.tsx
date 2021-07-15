import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import React, { Fragment } from 'react';
import { getAccessToken } from '../../app';
import { envVariables as e, routes, RouteKey } from '../../app/config';
import { AlertMessage, AlertSeverityType } from '../../components/material-ui/alert-message';
import { LinearIndeterminate } from '../../components/material-ui/feedback';
import { PageTitle } from '../../components/material-ui/typography';
import { Person, usePersonsLazyQuery } from '../../generated/graphql';

interface Props { }

export const PersonQueryPage: React.FC<Props> = () => {
  // hooks
  const [personQuery, { data, loading, error }] = usePersonsLazyQuery({
    fetchPolicy: e.apolloFetchPolicy,
    variables: {
      skip: 0,
      take: 50
    }
  });

  // only fire query if has a valid accessToken to prevent after login delay problems
  if (!data && !loading && getAccessToken()) {
    personQuery();
  }

  // catch error first
  if (error) {
    return <AlertMessage severity={AlertSeverityType.ERROR} message={error.message} />;
  }

  const pageTitle = <PageTitle>{routes[RouteKey.PERSONS].title}</PageTitle>;
  if (loading || !data) {
    return (
      <Fragment>
        {pageTitle}
        <LinearIndeterminate />
      </Fragment>
    );
  }

  return (
    <Fragment>
      {pageTitle}
      <Box component='span' m={1}>
        {data.persons.map((e: Person) =>
          <Typography key={e.id}>{e.id} : {e.firstName} : {e.lastName} : {e.email} : {e.username} : {e.fiscalNumber} : {e.mobilePhone}</Typography>
        )}
      </Box>
    </Fragment>
  );
}
