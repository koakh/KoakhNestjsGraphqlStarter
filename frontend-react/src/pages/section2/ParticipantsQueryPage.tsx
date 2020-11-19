import { ColDef } from '@material-ui/data-grid';
import React, { Fragment, useRef, useState } from 'react';
import { appConstants as c, getAccessToken } from '../../app';
import { envVariables as e, RouteKey, routes } from '../../app/config';
import { AlertMessage, AlertSeverityType } from '../../components/material-ui/alert-message';
import { CustomDialog } from '../../components/material-ui/custom-dialog';
import { LinearIndeterminate } from '../../components/material-ui/feedback';
import { CustomDataTable, modalPropertyColumns, objectPropsToDataTableRows, queryDataToDataTableRows } from '../../components/material-ui/tables';
import { PageTitle } from '../../components/material-ui/typography';
import { useParticipantsLazyQuery } from '../../generated/graphql';

interface Props { }

export const ParticipantsQueryPage: React.FC<Props> = () => {
  const [modalRows, setModalRows] = useState([])
  // hooks
  const [participantQuery, { data, loading, error }] = useParticipantsLazyQuery({
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
    participantQuery();
  }

  // catch error first
  if (error) {
    return <AlertMessage severity={AlertSeverityType.ERROR} message={error.message} />;
  }

  const pageTitle = <PageTitle>{routes[RouteKey.PARTICIPANTS].title}</PageTitle>;
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

  const columns: ColDef[] = [
    { field: 'id', headerName: 'Id', hide: true },
    { field: 'code', hide: true },
    { field: 'name', headerName: 'Name', width: 220 },
    { field: 'email', headerName: 'Email', width: 220 },
    { field: 'fiscalNumber', headerName: 'FiscalNumber', width: 220 },
    { field: 'ambassadors', hide: true },
    { field: 'fundsBalance', hide: true },
    { field: 'volunteeringHoursBalance', hide: true },
    { field: 'goodsStock', hide: true },
    { field: 'msp', hide: true },
    { field: 'participant', hide: true },
    { field: 'createdDate', hide: true },
    { field: 'createdByPersonId', hide: true },
    { field: 'metaData', hide: true },
    { field: 'metaDataInternal', hide: true },
  ];
  // TODO use type
  const rows = queryDataToDataTableRows<any>(columns, data.participants);
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
      <CustomDataTable columns={columns} rows={rows} attributes={attributes} />
      <CustomDialog ref={childRef} title='details' closeButtonLabel={c.I18N.close}>
        <CustomDataTable columns={modalPropertyColumns} rows={modalRows} />
      </CustomDialog>
    </Fragment>
  );
}
