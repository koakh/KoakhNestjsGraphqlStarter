import { useTransactionAddedSubscription, TransactionAddedSubscription } from '../../generated/graphql';
import React, { Fragment } from 'react';

type Props = { causeId: string };
const transactionAdded = new Array<TransactionAddedSubscription>();

export const TransactionAddedPage: React.FC<Props> = ({ causeId }) => {
  const { data, loading } = useTransactionAddedSubscription();
  if (!loading && data && data.transactionAdded) {
    transactionAdded.push(data);
  }
  const transactions = transactionAdded.map((e: TransactionAddedSubscription) => (
    <li key={e.transactionAdded.id}>{e.transactionAdded.createdDate} : {e.transactionAdded.id} : {e.transactionAdded.transactionType} : {e.transactionAdded.resourceType}</li>)
  );
  return <Fragment>{transactionAdded.length > 0 ? <ul>{transactions}</ul> : 'waiting for transactions...'}</Fragment>;
};
