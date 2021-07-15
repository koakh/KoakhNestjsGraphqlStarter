import { PersonsQuery, usePersonsLazyQuery } from '../generated/graphql';
import { envVariables as e } from '../app/config';

/**
 * TODO: Not Used
 * getPersons hook helper
 */
export const getPersons = async (): Promise<PersonsQuery> => {
  return new Promise((resolve, reject) => {
    const [personQuery, { data, loading, error }] = usePersonsLazyQuery({
      fetchPolicy: e.apolloFetchPolicy,
      variables: {
        skip: 0,
        take: 50
      }
    });
    if (!data && !loading) {
      personQuery();
    }
    if (error) reject(error);
    if (data) resolve(data);
  });
};
