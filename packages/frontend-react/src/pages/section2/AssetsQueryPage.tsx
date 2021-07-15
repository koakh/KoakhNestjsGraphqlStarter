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
import { AssetAddedSubscription, useAssetAddedSubscription, useAssetsLazyQuery } from '../../generated/graphql';
import { getGraphQLApolloError, useStyles } from '../../utils';

interface Props { }
const assetAdded = new Array<AssetAddedSubscription>();

export const AssetsQueryPage: React.FC<Props> = () => {
  // hooks styles
  const classes = useStyles();
  // state
  const [modalRows, setModalRows] = useState([])
  // hooks
  const [assetQuery, { data, loading, error }] = useAssetsLazyQuery({
    fetchPolicy: e.apolloFetchPolicy,
    variables: {
      skip: 0,
      take: 50
    }
  });
  // subscriptions
  const { data: dataSub, loading: loadingSub, error: errorSub } = useAssetAddedSubscription();
  
  // reference to use in module to be exposed to parent in childRef.current
  const childRef = useRef<{ open: () => void }>();

  // only fire query if has a valid accessToken to prevent after login delay problems
  if (!data && !loading && getAccessToken()) {
    assetQuery();
  }

  // subscriptions: seem that we don't need useEffect, creates some issues when we scroll with double renders and
  // only work if we scroll, the best way is to check if dataSub.modelAdded.id is different than the last in item in modelAdded array
  // this way we don't have render's and works with all subscriptions 
  if (!loadingSub && dataSub && dataSub.assetAdded && (
    (assetAdded.length === 0) ||
    (assetAdded.length > 0 && assetAdded[assetAdded.length - 1].assetAdded.id !== dataSub.assetAdded.id)
  )
  ) {
    assetAdded.push(dataSub);
  }
  if (errorSub) {
    debugger;
    return <AlertMessage severity={AlertSeverityType.ERROR} message={getGraphQLApolloError(errorSub)} />;
  }

  // catch error first
  if (error) {
    return <AlertMessage severity={AlertSeverityType.ERROR} message={error.message} />;
  }

  const pageTitle = <PageTitle>{routes[RouteKey.ASSETS].title}</PageTitle>;
  if (loading || !data) {
    return (
      <Fragment>
        {pageTitle}
        <LinearIndeterminate />
      </Fragment>
    );
  }

  // render subscriptionsContent
  const assets = assetAdded.map((e: AssetAddedSubscription) => (
    <Box key={e.assetAdded.id} component='span' m={1}>
      <Typography>{e.assetAdded.name} : {e.assetAdded.id}</Typography>
    </Box>
  ));
  const subscriptionsContent = assetAdded.length > 0 ? assets : <Typography>{c.I18N.waitingForSubscriptions}</Typography>

  // modal handlers
  const handleClickOpen = () => {
    // console.log('handleCancel');
    childRef.current.open();
  }

  const columns: ColDef[] = [
    { field: 'id', hide: true },
    { field: 'name', headerName: 'Name', width: 140, },
    { field: 'assetType', headerName: 'AssetType', width: 140 },
    { field: 'description', hide: true },
    { field: 'ambassadors', hide: true },
    { field: 'owner', hide: true },
    { field: 'location', hide: true },
    { field: 'tags', hide: true },
    { field: 'participant', hide: true },
    { field: 'createdDate', hide: true },
    { field: 'createdByPersonId', hide: true },
    { field: 'metaData', hide: true },
    { field: 'metaDataInternal', hide: true },
  ];
  // type is to complex to pass in generic
  const rows = queryDataToDataTableRows<any>(columns, data.assets);
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
      <CustomDataTable columns={columns} rows={rows} attributes={attributes} />
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
