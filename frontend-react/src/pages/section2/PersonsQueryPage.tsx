import { ColDef } from '@material-ui/data-grid';
import React, { Fragment, useRef, useState } from 'react';
import { appConstants as c, getAccessToken } from '../../app';
import { envVariables as e, RouteKey, routes } from '../../app/config';
import { AlertMessage, AlertSeverityType } from '../../components/material-ui/alert-message';
import { CustomDialog } from '../../components/material-ui/custom-dialog';
import { LinearIndeterminate } from '../../components/material-ui/feedback';
import { CustomDataTable, modalPropertyColumns, objectPropsToDataTableRows, queryDataToDataTableRows } from '../../components/material-ui/tables';
import { PageTitle } from '../../components/material-ui/typography';
import { Person, usePersonsLazyQuery } from '../../generated/graphql';

interface Props { }

export const PersonQueryPage: React.FC<Props> = () => {
  const [modalRows, setModalRows] = useState([])
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
  // const handleCancel = () => {
  //   console.log('handleCancel');
  // }
  // other actions
  // const dialogActions = (<Button onClick={handleCancel} color='primary'>Cancel</Button>);

  const columns: ColDef[] = [
    { field: 'id', hide: true },
    { field: 'username', headerName: 'Username', width: 140, },
    { field: 'fiscalNumber', headerName: 'FiscalNumber', width: 140 },
    { field: 'mobilePhone', headerName: 'MobilePhone', width: 140 },
    { field: 'email', headerName: 'Email', width: 240 },
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
    pageSize: 50,
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
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <CustomDialog ref={childRef} title='details' closeButtonLabel={c.I18N.close}>
        <CustomDataTable columns={modalPropertyColumns} rows={modalRows} />
      </CustomDialog>
    </Fragment>
  );
}