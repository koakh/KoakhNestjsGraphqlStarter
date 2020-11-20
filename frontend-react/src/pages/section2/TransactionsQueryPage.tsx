import { ColDef } from '@material-ui/data-grid';
import React, { Fragment, useRef, useState } from 'react';
import { appConstants as c, getAccessToken } from '../../app';
import { envVariables as e, RouteKey, routes } from '../../app/config';
import { AlertMessage, AlertSeverityType } from '../../components/material-ui/alert-message';
import { CustomDialog } from '../../components/material-ui/custom-dialog';
import { LinearIndeterminate } from '../../components/material-ui/feedback';
import { CustomDataTable, modalPropertyColumns, objectPropsToDataTableRows, queryDataToDataTableRows } from '../../components/material-ui/tables';
import { PageTitle } from '../../components/material-ui/typography';
import { useTransactionsLazyQuery } from '../../generated/graphql';
import { useStyles } from '../../utils';
import { Box } from '@material-ui/core';

interface Props { }

export const TransactionsQueryPage: React.FC<Props> = () => {
	// hooks styles
  const classes = useStyles();
  // state
  const [modalRows, setModalRows] = useState([])
  // hooks
  const [transactionQuery, { data, loading, error }] = useTransactionsLazyQuery({
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
    transactionQuery();
  }

  // catch error first
  if (error) {
    return <AlertMessage severity={AlertSeverityType.ERROR} message={error.message} />;
  }

  const pageTitle = <PageTitle>{routes[RouteKey.TRANSACTIONS].title}</PageTitle>;
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
    { field: 'id', hide: true },
    { field: 'transactionType', headerName: 'TransactionType', width: 200 },
    { field: 'resourceType', headerName: 'ResourceType', width: 200 },
    { field: 'input' },
    { field: 'output' },
    { field: 'quantity', hide: true },
    { field: 'currency', hide: true },
    { field: 'location', hide: true },
    { field: 'participant', hide: true },
    { field: 'assetId', hide: true },
    { field: 'goods', hide: true },
    { field: 'tags', hide: true },
    { field: 'createdDate', hide: true },
    { field: 'createdByPersonId', hide: true },
    { field: 'metaData', hide: true },
    { field: 'metaDataInternal', hide: true },    
  ];
  // TODO use type
  const rows = queryDataToDataTableRows<any>(columns, data.transactions);
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
      {/* subscriptions */}
      <Box className={classes.spacerTop}><PageTitle>{c.I18N.subscriptions}</PageTitle></Box>
      {/* customDialog */}
      <CustomDialog ref={childRef} title='details' closeButtonLabel={c.I18N.close}>
        <CustomDataTable columns={modalPropertyColumns} rows={modalRows} />
      </CustomDialog>
    </Fragment>
  );
}
