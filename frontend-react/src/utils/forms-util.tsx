/**
 * helper file with common jsx functionl stuff for dynamic forms
 */

import { ApolloError } from '@apollo/client';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { Fragment } from 'react';
import { Control, Controller, DeepMap, FieldError } from 'react-hook-form';
import { appConstants as c } from '../app/constants';
import { FormInputType, FormPropFields } from '../types';
import { recordToArray } from './main-util';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: 'fullWidth',
  },
  spacer: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginRight: theme.spacing(2),
  },
}));

/**
 * common control properties
 */
export const commonControllProps: { [key: string]: string } = {
  variant: 'outlined',
  margin: 'normal',
};

export const validationMessage = (messageType: 'required' | 'invalid', fieldName: string, ) => `${fieldName} is ${c.KEYWORDS[messageType]}`;

/**
 * a simple helper to generate regExpt rules
 * @param fieldName 
 * @param regExp 
 */
export const validationRuleRegExHelper = (fieldName: string, regExp: RegExp) => {
  return {
    required: validationMessage('required', fieldName),
    pattern: {
      value: regExp,
      message: validationMessage('invalid', fieldName),
    },
  };
}

/**
 * helper to extract string error message from ApolloError
 */
export const getGraphQLApolloError = (apolloError: ApolloError): string => {
  let errorMessage = '';
  if (apolloError) {
    if (typeof (apolloError.message === 'string')) {
      errorMessage = apolloError.message;
    } else if (typeof (apolloError.graphQLErrors[0].message as any).error === 'string') {
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
  return recordToArray<FormPropFields>(formDefinition).map((e: FormPropFields) => {
    switch (e.type) {
      case FormInputType.TEXT:
      case FormInputType.PASSWORD:
        return generateTextField(e, control, errors, loading);
      case FormInputType.AUTOCOMPLETE:
        return generateAutocomplete(e, control, errors, loading);
      // return <ControlledAutocomplete
      //   key={e.name}
      //   control={control}
      //   name={e.name}
      //   options={[
      //     { title: 'The Shawshank Redemption', value: 1994 },
      //     { title: 'The Godfather', value: 1972 }
      //   ]}
      //   renderInput={(params: any) => <TextField {...params} label='My label' margin='normal' />}
      //   defaultValue={null}
      //   multiple
      //   disableCloseOnSelect
      //   getOptionLabel={(option: any) => option.title}
      //   getOptionSelected={(option: any, value: any) => option.value === value.value}
      // />
    }
  })
}

const generateTextField = (e: FormPropFields, control: Control<Record<string, any>>, errors: DeepMap<any, FieldError>, loading: boolean): JSX.Element => {
  return (
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
  )
}

/**
 * helper to generate Autocomplete component 
 * @param options [{ title: 'The Shawshank Redemption', year: 1994 }...]
 */
const generateAutocomplete = (
  e: FormPropFields, control: Control<Record<string, any>>, errors: DeepMap<any, FieldError>, loading: boolean
) => {
  const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
  const checkedIcon = <CheckBoxIcon fontSize='small' />;
  // working but has no value
  // return (
  //   <Fragment key={e.name}>
  //     <Autocomplete
  //       id={e.name}
  //       options={options}
  //       multiple
  //       disableCloseOnSelect
  //       defaultValue={[options[1]]}
  //       getOptionLabel={(option) => option.title}
  //       getOptionSelected={(option, value) => option.value === value.value}
  //       renderOption={(option, { selected }) => (
  //         <Fragment>
  //           <Checkbox
  //             icon={icon}
  //             checkedIcon={checkedIcon}
  //             style={{ marginRight: 8 }}
  //             checked={selected}
  //           />
  //           {option.title}
  //         </Fragment>
  //       )}
  //       renderInput={(params) => (
  //         <TextField name={e.name} inputRef={e.inputRef} {...params} variant='outlined' label={e.label} placeholder={e.placeholder} />
  //       )}
  //       fullWidth={e.fullWidth}
  //       disabled={loading}
  //       onFocus={() => { e.inputRef.current.focus(); }}
  //       {...e.controllProps}
  //     />
  //   </Fragment>
  // );

  return (
    <Fragment key={e.name}>
      <Controller
        name={e.name}
        control={control}
        rules={e.rules}
        render={({ onChange, ...props }) => (
          <Autocomplete
            id={e.name}
            options={e.options}
            multiple={e.multipleOptions}
            disableCloseOnSelect
            filterSelectedOptions
            getOptionLabel={(option) => option.title}
            getOptionSelected={(option, value) => option.value === value.value}
            renderOption={(option, { selected }) => (
              <Fragment>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.title}
              </Fragment>
            )}
            renderInput={(params) => (
              <TextField
                name={e.name}
                inputRef={e.inputRef}
                variant='outlined'
                label={e.label}
                placeholder={e.placeholder}
                error={(errors[(e.name)] !== undefined)}
                helperText={(errors[(e.name as any)] !== undefined) ? errors[(e.name as any)].message : e.helperText}
                {...params}
                {...e.controllProps}
              />
            )}
            onChange={(e, data) => onChange(data)}
            fullWidth={e.fullWidth}
            disabled={loading}
            onFocus={() => { e.inputRef.current.focus(); }}
            defaultValue={[e.options[0], e.options[2]]}
          />
        )}
      />
    </Fragment>
  );

  // return (
  //   <Fragment key={e.name}>
  //     <Controller
  //       type={e.type}
  //       control={control}
  //       as={<Autocomplete
  //         // use ref not inputRef
  //         ref={e.inputRef}
  //         options={options}
  //         multiple
  //         disableCloseOnSelect
  //         getOptionLabel={(option) => option.title}
  //         renderOption={(option, { selected }) => (
  //           <Fragment>
  //             <Checkbox
  //               icon={icon}
  //               checkedIcon={checkedIcon}
  //               style={{ marginRight: 8 }}
  //               checked={selected}
  //             />
  //             {option.title}
  //           </Fragment>
  //         )}
  //         renderInput={(params) => (
  //           <TextField {...params} variant='outlined' label={e.label} placeholder={e.placeholder} />
  //         )}
  //         // {...e.controllProps}
  //       />}
  //       name={(e.name as string)}
  //       // error={(errors[(e.name)] !== undefined)}
  //       // helperText={(errors[(e.name as any)] !== undefined) ? errors[(e.name as any)].message : e.helperText}
  //       // label={e.label}
  //       // placeholder={e.placeholder}
  //       // className={e.className}
  //       fullWidth={e.fullWidth}
  //       // rules={e.rules}
  //       // disabled={loading}
  //       // onFocus={() => { e.inputRef.current.focus(); }}
  //     />
  //   </Fragment>
  // )

  // return (
  //   <Controller
  //     key={e.name}
  //     name={e.name}
  //     control={control}
  //     render={({ onChange, ...props }) => (
  //       <Autocomplete
  //         options={options}
  //         getOptionLabel={(option) => option.title}
  //         getOptionSelected={(option, value) => option.value === value.value}
  //         renderInput={(params) => (
  //           <TextField {...params} variant='outlined' label={e.label} placeholder={e.placeholder} />
  //         )}
  //         renderOption={(option, { selected }) => (
  //           <Fragment>
  //             <Checkbox
  //               icon={icon}
  //               checkedIcon={checkedIcon}
  //               style={{ marginRight: 8 }}
  //               checked={selected}
  //             />
  //             {option.title}
  //           </Fragment>
  //         )}
  //         onChange={(e, data) => onChange(data)}
  //         {...props}
  //         fullWidth={e.fullWidth}
  //         disabled={loading}
  //       />
  //     )}
  //     onChange={([, data]: any) => data}
  //     defaultValue={null}
  //     // multiple
  //     // disableCloseOnSelect
  //     // onFocus={() => { e.inputRef.current.focus(); }}
  //     // {...e.controllProps}
  //   />
  // );
}

// const ControlledAutocomplete = ({ options = [], renderInput, getOptionLabel, onChange: ignored, control, defaultValue, name, renderOption }: any) => {
//   return (
//     <Controller
//       render={({ onChange, ...props }) => (
//         <Autocomplete
//           options={options}
//           getOptionLabel={getOptionLabel}
//           renderOption={renderOption}
//           renderInput={renderInput}
//           onChange={(e, data) => onChange(data)}
//           {...props}
//         />
//       )}
//       onChange={([, data]: any) => data}
//       defaultValue={defaultValue}
//       name={name}
//       control={control}
//     />
//   );
// }