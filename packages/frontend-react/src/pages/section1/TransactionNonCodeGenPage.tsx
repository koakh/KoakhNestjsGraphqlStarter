// normal subscription without graphql-codegen

import * as React from 'react';
import { useSubscription, gql } from '@apollo/client';

type Props = { causeId: string };
type DataScheme = { transactionAdded?: any} ;

const TRANSACTION_ADDED = gql`
subscription transactionAdded{
  transactionAdded {
    id
    transactionType
    resourceType
    input {
      entity {
        id
        type
        createdDate
      }
    }
    output {
      entity {
        id
        type
        createdDate
      }
    }
    quantity
    currency
    location
    createdDate
  }
}`;

export const TransactionsNonCodeGen: React.FC<Props> = ({ causeId }) => {
  const { data, loading } = useSubscription<DataScheme>(
    TRANSACTION_ADDED,
    // { variables: { causeId } }
  );
  return <h4>New transaction: {!loading && data && data.transactionAdded ? data.transactionAdded.id : 'waiting' }</h4>;
};
