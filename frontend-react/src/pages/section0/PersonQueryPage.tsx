import * as React from 'react';
import { getAccessToken } from '../../app';
import { ShowMessage, Loading } from '../../components';
import { envVariables as e } from '../../app/config/env';
import { Person, usePersonsLazyQuery } from '../../generated/graphql';
import { MessageType } from '../../types';

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

  // only fire query if has a valid accessToken to prevent after login delay problems
  if (!data && !loading && getAccessToken()) {
    personQuery();
  }

  // catch error first
  if (error) {
    return <ShowMessage type={MessageType.ERROR} message={error.message} />;
  }

  if (loading || !data) {
    return <Loading />
  }

  return (
    <div>
      <h2>Home</h2>
      <ul>
        {data.persons.map((e: Person) =>
          <li key={e.id}>{e.id} : {e.firstName} : {e.lastName} : {e.email} : {e.username}</li>
        )}
      </ul>
    </div>
  );
}
