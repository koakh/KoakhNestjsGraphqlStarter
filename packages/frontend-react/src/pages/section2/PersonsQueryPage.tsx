/* eslint-disable no-template-curly-in-string */
import { Box, Typography } from '@material-ui/core';
import { ColDef } from '@material-ui/data-grid';
import React, { Fragment, useRef, useState } from 'react';
import { appConstants as c, getAccessToken } from '../../app';
import { envVariables as e, RouteKey, routes } from '../../app/config';
import { AlertMessage, AlertSeverityType } from '../../components/material-ui/alert-message';
import { CustomDialog } from '../../components/material-ui/custom-dialog';
import { LinearIndeterminate } from '../../components/material-ui/feedback';
import { CustomDataTable, modalPropertyColumns, objectPropsToDataTableRows, queryDataToDataTableRows } from '../../components/material-ui/tables';
import { PageTitle } from '../../components/material-ui/typography';
import { Person, PersonAddedSubscription, usePersonAddedSubscription, usePersonsLazyQuery } from '../../generated/graphql';
import { getGraphQLApolloError, useStyles } from '../../utils';
import { generateMediaCardQuickButton } from '../../utils/tsx-util';

interface Props { }
const personAdded = new Array<PersonAddedSubscription>();

export const PersonQueryPage: React.FC<Props> = () => {
  // hooks styles
  const classes = useStyles();
  // state
  const [modalRows, setModalRows] = useState([])
  // hooks
  const [personQuery, { data, loading, error }] = usePersonsLazyQuery({
    fetchPolicy: e.apolloFetchPolicy,
    variables: {
      skip: 0,
      take: 50
    }
  });
  // subscriptions
  const { data: dataSub, loading: loadingSub, error: errorSub } = usePersonAddedSubscription();
  // reference to use in module to be exposed to parent in childRef.current
  const childRef = useRef<{ open: () => void }>();

  // only fire query if has a valid accessToken to prevent after login delay problems
  if (!data && !loading && getAccessToken()) {
    personQuery();
  }

  // subscriptions: seem that we don't need useEffect, creates some issues when we scroll with double renders and
  // only work if we scroll, the best way is to check if dataSub.modelAdded.id is different than the last in item in modelAdded array
  // this way we don't have render's and works with all subscriptions 
  if (!loadingSub && dataSub && dataSub.personAdded && (
    (personAdded.length === 0) ||
    (personAdded.length > 0 && personAdded[personAdded.length - 1].personAdded.id !== dataSub.personAdded.id)
  )
  ) {
    personAdded.push(dataSub);
  }
  if (errorSub) {
    return <AlertMessage severity={AlertSeverityType.ERROR} message={getGraphQLApolloError(errorSub)} />;
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

  // render subscriptionsContent
  const persons = personAdded.map((e: PersonAddedSubscription) => (
    <Box key={e.personAdded.id} component='span' m={1}>
      <Typography>{e.personAdded.username} : {e.personAdded.id}</Typography>
    </Box>
  ));
  const subscriptionsContent = personAdded.length > 0 ? persons : <Typography>{c.I18N.waitingForSubscriptions}</Typography>

  // modal handlers
  const handleClickOpen = () => {
    // console.log('handleCancel');
    childRef.current.open();
  }
  // const handleCancel = () => {
  //   console.log('handleCancel');
  // }
  // other actions
  // const dialogActions = (<Button onClick={handleCancel} color='primary'>Cancel</Button>);

  const columns: ColDef[] = [
    { field: 'id', hide: true },
    { field: 'username', headerName: 'Username', width: 140, },
    { field: 'fiscalNumber', headerName: 'FiscalNumber', width: 140 },
    { field: 'email', headerName: 'Email', width: 240 },
    { field: 'mobilePhone', headerName: 'MobilePhone', hide: true },
    { field: 'firstName', hide: true },
    { field: 'lastName', hide: true },
    { field: 'gender', hide: true },
    { field: 'height', hide: true },
    { field: 'fatherFirstName', hide: true },
    { field: 'fatherLastName', hide: true },
    { field: 'motherFirstName', hide: true },
    { field: 'motherLastName', hide: true },
    { field: 'birthDate', hide: true },
    { field: 'nationality', hide: true },
    { field: 'city', hide: true },
    { field: 'postal', hide: true },
    { field: 'region', hide: true },
    { field: 'country', hide: true },
    { field: 'geoLocation', hide: true },
    { field: 'timezone', hide: true },
    { field: 'personalInfo', hide: true },
    { field: 'documentNumber', hide: true },
    { field: 'documentType', hide: true },
    { field: 'cardVersion', hide: true },
    { field: 'emissionDate', hide: true },
    { field: 'expirationDate', hide: true },
    { field: 'emittingEntity', hide: true },
    { field: 'identityNumber', hide: true },
    { field: 'socialSecurityNumber', hide: true },
    { field: 'beneficiaryNumber', hide: true },
    { field: 'pan', hide: true },
    { field: 'requestLocation', hide: true },
    { field: 'otherInformation', hide: true },
    { field: 'registrationDate', hide: true },
    { field: 'profile', hide: true },
    { field: 'fundsBalance', hide: true },
    { field: 'volunteeringHoursBalance', hide: true },
    { field: 'goodsStock', hide: true },
    { field: 'attributes', hide: true },
    { field: 'roles', hide: true },
    { field: 'participant', hide: true },
    { field: 'createdDate', hide: true },
    { field: 'metaData', hide: true },
    { field: 'metaDataInternal', hide: true },
  ];
  const rows = queryDataToDataTableRows<Person>(columns, data.persons);
  const attributes = {
    pageSize: c.VALUES.dataGridPageSize,
    onRowClick: (e: { data: any }) => {
      const rows = objectPropsToDataTableRows(e.data);
      setModalRows(rows);
      handleClickOpen();
    }
  };

  return (
    <Fragment>
      {pageTitle}
      {/* <Box component='span' m={1}>
        {data.persons.map((e: Person) =>
          <Typography key={e.id}>{e.id} : {e.firstName} : {e.lastName} : {e.email} : {e.username} : {e.fiscalNumber} : {e.mobilePhone}</Typography>
        )}
      </Box> */}
      <CustomDataTable columns={columns} rows={rows} attributes={attributes} />
      {/* quickButtons */}
      <Box className={classes.spacerTop}><PageTitle>{c.I18N.quickDonateButtons}</PageTitle></Box>
      {generateMediaCardQuickButton(data.persons, classes, 28, '${username} / ${email}', 'Cras euismod elementum turpis eget pharetra. Class aptent taciti sociosqu ...')}
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      {/* subscriptions */}
      <Box className={classes.spacerTop}><PageTitle>{c.I18N.subscriptions}</PageTitle></Box>
      {subscriptionsContent}
      {/* customDialog */}
      <CustomDialog ref={childRef} title='details' closeButtonLabel={c.I18N.close}>
        <CustomDataTable columns={modalPropertyColumns} rows={modalRows} />
      </CustomDialog>
    </Fragment>
  );
}
