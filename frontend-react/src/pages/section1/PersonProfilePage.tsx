import * as React from 'react';
import { Loading, ShowMessage } from '../../components';
import { envVariables as e } from '../../app/config/env';
import { usePersonProfileQuery } from '../../generated/graphql';
import { MessageType } from '../../types/types';

interface Props { }

export const PersonProfilePage: React.FC<Props> = () => {
  const { data, loading, error } = usePersonProfileQuery({
    fetchPolicy: e.apolloFetchPolicy
  });

  if (error) {
    return <ShowMessage type={MessageType.ERROR} message={error.message} />;
  }

  if (loading || !data) {
    return <Loading />
  }

  const { personProfile } = data;
  return (
    <div>
      <h1>Profile</h1>
      <pre>{JSON.stringify(personProfile, undefined, 2)}</pre>
    </div>
  );
}