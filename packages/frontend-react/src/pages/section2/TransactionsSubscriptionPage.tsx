import { Box, Typography } from '@material-ui/core';
import React, { Fragment } from 'react';
import { AlertMessage, AlertSeverityType } from '../../components/material-ui/alert-message';
import { PageTitle } from '../../components/material-ui/typography';
import { TransactionAddedSubscription, useTransactionAddedSubscription } from '../../generated/graphql';

type Props = { causeId: string };
const transactionAdded = new Array<TransactionAddedSubscription>();

// TODO send and filter by causeId, personId or participantId
export const TransactionSubscriptionPage: React.FC<Props> = ({ causeId }) => {
  // state
  const { data, loading, error } = useTransactionAddedSubscription();

  if (!loading && data && data.transactionAdded) {
    transactionAdded.push(data);
  }

  if (error) {
    return <AlertMessage severity={AlertSeverityType.ERROR} message={error.message} />;
  }

  const transactions = transactionAdded.map((e: TransactionAddedSubscription) => (
    <Box key={e.transactionAdded.id} component='span' m={1}>
      <Typography>{e.transactionAdded.createdDate} : {e.transactionAdded.id} : {e.transactionAdded.transactionType} : {e.transactionAdded.resourceType}</Typography>
    </Box>
  ));

  const pageTitle = <PageTitle>TransactionsAdded</PageTitle>;
  const pageContent = transactionAdded.length > 0 ? transactions : <Typography>waiting for transactions...</Typography>
  return (
    <Fragment>
      {pageTitle}
      <Box component='span' m={1}>
        {pageContent}
      </Box>
    </Fragment>
  );
};
