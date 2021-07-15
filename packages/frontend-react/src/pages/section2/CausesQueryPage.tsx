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
import { CauseAddedSubscription, useCauseAddedSubscription, useCausesLazyQuery } from '../../generated/graphql';
import { getGraphQLApolloError, useStyles } from '../../utils';
import { generateMediaCardQuickButton } from '../../utils/tsx-util';

interface Props { }
const causeAdded = new Array<CauseAddedSubscription>();

export const CausesQueryPage: React.FC<Props> = () => {
  // hooks styles
  const classes = useStyles();
  // state
  const [modalRows, setModalRows] = useState([])
  // hooks
  const [causeQuery, { data, loading, error }] = useCausesLazyQuery({
    fetchPolicy: e.apolloFetchPolicy,
    variables: {
      skip: 0,
      take: 50
    }
  });
  // subscriptions
  const { data: dataSub, loading: loadingSub, error: errorSub } = useCauseAddedSubscription();

  // reference to use in module to be exposed to parent in childRef.current
  const childRef = useRef<{ open: () => void }>();

  // only fire query if has a valid accessToken to prevent after login delay problems
  if (!data && !loading && getAccessToken()) {
    causeQuery();
  }

  // subscriptions: seem that we don't need useEffect, creates some issues when we scroll with double renders and
  // only work if we scroll, the best way is to check if dataSub.modelAdded.id is different than the last in item in modelAdded array
  // this way we don't have render's and works with all subscriptions 
  if (!loadingSub && dataSub && dataSub.causeAdded && (
    (causeAdded.length === 0) ||
    (causeAdded.length > 0 && causeAdded[causeAdded.length - 1].causeAdded.id !== dataSub.causeAdded.id)
  )
  ) {
    causeAdded.push(dataSub);
  }
  if (errorSub) {
    return <AlertMessage severity={AlertSeverityType.ERROR} message={getGraphQLApolloError(errorSub)} />;
  }

  // catch error first
  if (error) {
    return <AlertMessage severity={AlertSeverityType.ERROR} message={error.message} />;
  }

  const pageTitle = <PageTitle>{routes[RouteKey.CAUSES].title}</PageTitle>;
  if (loading || !data) {
    return (
      <Fragment>
        {pageTitle}
        <LinearIndeterminate />
      </Fragment>
    );
  }

  // render subscriptionsContent
  const causes = causeAdded.map((e: CauseAddedSubscription) => (
    <Box key={e.causeAdded.id} component='span' m={1}>
      <Typography>{e.causeAdded.name} : {e.causeAdded.id}</Typography>
    </Box>
  ));
  const subscriptionsContent = causeAdded.length > 0 ? causes : <Typography>{c.I18N.waitingForSubscriptions}</Typography>

  // modal handlers
  const handleClickOpen = () => {
    // console.log('handleCancel');
    childRef.current.open();
  }

  const columns: ColDef[] = [
    { field: 'id', headerName: 'Id', hide: true },
    { field: 'name', headerName: 'Name', width: 220 },
    { field: 'email', headerName: 'Email', width: 220 },
    { field: 'tags', headerName: 'Tags', width: 220 },
    { field: 'startDate', hide: true },
    { field: 'endDate', hide: true },
    { field: 'ambassadors', hide: true },
    { field: 'location', hide: true },
    { field: 'input', hide: true },
    { field: 'fundsBalance', hide: true },
    { field: 'volunteeringHoursBalance', hide: true },
    { field: 'goodsStock', hide: true },
    { field: 'participant', hide: true },
    { field: 'createdDate', hide: true },
    { field: 'createdByPersonId', hide: true },
    { field: 'metaData', hide: true },
    { field: 'metaDataInternal', hide: true },
  ];
  // type is to complex to pass in generic
  const rows = queryDataToDataTableRows<any>(columns, data.causes);
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
      {/* QuickButtons */}
      <Box className={classes.spacerTop}><PageTitle>{c.I18N.quickDonateButtons}</PageTitle></Box>
      {generateMediaCardQuickButton(data.causes, classes, 228, '${name} / ${email}', 'Cras euismod elementum turpis eget pharetra. Class aptent taciti sociosqu ...')}
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
