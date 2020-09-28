import { ApolloError } from '@apollo/client';

/**
 * helper to extract string error message from ApolloError
 */
export const getGraphQLApolloError = (apolloError: ApolloError): string => {
  let errorMessage = '';
  if (apolloError) {
    if (typeof (apolloError.graphQLErrors[0].message as any).error === 'string') {
      errorMessage = (apolloError.graphQLErrors[0].message as any).error;
    } else if (typeof (apolloError.graphQLErrors[0].message as any).error.message === 'string') {
      errorMessage = (apolloError.graphQLErrors[0].message as any).error.message;
    }
  }
  return errorMessage;
}