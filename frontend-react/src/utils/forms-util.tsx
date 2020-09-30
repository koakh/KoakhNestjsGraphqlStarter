import { ApolloError } from '@apollo/client';
import TextField from '@material-ui/core/TextField';
import React, { Fragment } from 'react';
import { Controller, Control, DeepMap, FieldError } from 'react-hook-form';
import { FormPropFields } from '../types';
import { recordToArray } from './main-util';

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

// trick to use generics with jsx, we can use <T> it will be interpreted as jsx
// https://stackoverflow.com/questions/41112313/how-to-use-generics-with-arrow-functions-in-typescript-jsx-with-react?rq=1
// use '<T extends {}>'
// T is FormInputs
export const generateFormDefinition = (formDefinition: any, control: Control<Record<string, any>>, errors: DeepMap<any, FieldError>, loading: boolean): JSX.Element[] => {
  return recordToArray<FormPropFields>(formDefinition).map((e: FormPropFields) => (
    <Fragment key={e.name}>
      <Controller
        type={e.type}
        control={control}
        as={<TextField inputRef={e.inputRef} {...e.controllProps} />}
        name={(e.name as string)}
        error={(errors[(e.name)] !== undefined)}
        helperText={(errors[(e.name as any)] !== undefined) ? errors[(e.name as any)].message : e.helperText}
        label={e.label}
        placeholder={e.placeholder}
        className={e.className}
        fullWidth={e.fullWidth}
        rules={e.rules}
        disabled={loading}
        onFocus={() => { e.inputRef.current.focus(); }}
      />
    </Fragment>
  ))
}
