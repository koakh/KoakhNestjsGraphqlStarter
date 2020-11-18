import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import React, { Fragment, useRef } from 'react';
import { getAccessToken } from '../../app';
import { envVariables as e, routes, RouteKey } from '../../app/config';
import { AlertMessage, AlertSeverityType } from '../../components/material-ui/alert-message';
import { CustomDialog } from '../../components/material-ui/custom-dialog';
import { LinearIndeterminate } from '../../components/material-ui/feedback';
import { PageTitle } from '../../components/material-ui/typography';
import { Person, usePersonsLazyQuery } from '../../generated/graphql';
import { appConstants as c } from '../../app';

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
  // reference to use in module to be exposed to parent in childRef.current
  const childRef = useRef<{ open: () => void }>();

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

  // modal handlers
  const handleClickOpen = () => {
    console.log('handleCancel');
    childRef.current.open();
  }
  const handleCancel = () => {
    console.log('handleCancel');
  }
  // other actions
  const dialogActions = (<Button onClick={handleCancel} color='primary'>Cancel</Button>);

  return (
    <Fragment>
      {pageTitle}
      <Box component='span' m={1}>
        {data.persons.map((e: Person) =>
          <Typography key={e.id}>{e.id} : {e.firstName} : {e.lastName} : {e.email} : {e.username} : {e.fiscalNumber} : {e.mobilePhone}</Typography>
        )}
      </Box>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <CustomDialog ref={childRef} title='title' closeButtonLabel={c.I18N.close} dialogActions={dialogActions} />
    </Fragment>
  );
}
