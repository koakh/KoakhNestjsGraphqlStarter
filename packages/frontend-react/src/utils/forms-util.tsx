/* eslint-disable no-template-curly-in-string */
/* eslint-disable array-callback-return */

/**
 * helper file with common jsx functional stuff for dynamic forms
 */

import { ApolloError } from '@apollo/client';
import { Button, FormHelperText } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import Autocomplete, { AutocompleteRenderInputParams } from "@material-ui/lab/Autocomplete";
import { capitalCase, constantCase } from "change-case";
import React, { Fragment } from 'react';
import { Control, Controller, DeepMap, FieldError } from 'react-hook-form';
import { appConstants as c } from '../app/constants';
import { AutocompleteAndSelectOptions, FormInputType, FormPropFields } from '../types';
import { recordToArray } from './main-util';
import { validateBarCode } from './validation';

// used outside in forms
export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: 'fullWidth',
  },
  spacer: {
    marginBottom: theme.spacing(2),
  },
  spacerTop: {
    marginTop: theme.spacing(2),
  },
  // helper
  redColor: {
    backgroundColor: 'red',
  },
  formButtonsDiv: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  button: {
    marginRight: theme.spacing(2),
  },
  buttonGoodsActions: {
    marginTop: theme.spacing(2),
    height: 54,
  },
  buttonGoodsAdd: {
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

/**
 * common control properties
 */
export const commonControlProps: { [key: string]: string } = {
  variant: 'outlined',
  margin: 'normal',
};

export const validationMessage = (messageType: 'required' | 'invalid', fieldName: string,) => `${fieldName} is ${c.I18N[messageType]}`;

/**
 * a simple helper to generate regExp rules
 * @param fieldName 
 * @param regExp 
 */
export const validationRuleRegExHelper = (fieldName: string, regExp: RegExp, required: boolean = true) => {
  return {
    required: (required) ? validationMessage('required', fieldName) : false,
    pattern: {
      value: regExp,
      message: validationMessage('invalid', fieldName),
    },
  };
}

/**
 * helper to validate barCode
 * @param fieldName 
 * @param value 
 * @param required 
 */
export const validationBarCodeExHelper = (fieldName: string, value: any, required: boolean = true) => {
  return {
    required: (required) ? validationMessage('required', fieldName) : false,
    validate: () => (value && value.barCode && validateBarCode(value.barCode))
      ? true
      : validationMessage('invalid', fieldName),
  };
}

/**
 * validate an array of regExp, returns true if any of the items in array return true, acts like OR
 * @param value 
 * @param regExpArray 
 */
export const validateRegExpArray = (value: string, regExpArray: RegExp[]): boolean => {
  // returns true when match one predicated that match
  return regExpArray.some((e: RegExp) => e.test(value));
}

/**
 * validate an array of values and check if all values pass with any of the regExp
 * @param values 
 * @param regExpArray 
 */
export const validateRegExpArrayWithValuesArray = (values: string[], regExpArray: RegExp[]): string[] => {
  const failValues: string[] = [];
  values.forEach((v: string) => {
    // test any value in any regExp
    const result = regExpArray.some((e: RegExp) => e.test(v));
    if (!result) {
      failValues.push(v);
    }
  });
  // return failValues to caller 
  return failValues;
}

/**
 * helper to extract string error message from ApolloError
 */
export const getGraphQLApolloError = (apolloError: ApolloError): string => {
  let errorMessage = '';
  if (apolloError) {
    // errorMessage = apolloError.message
    const propExists = (obj: any, path: any) => {
      return !!path.split('.').reduce((obj: any, prop: any) => {
        return obj && obj[prop] ? obj[prop] : undefined;
      }, obj)
    }

    if (propExists(apolloError, 'graphQLErrors.0.extensions.exception.message.error')) {
      errorMessage = apolloError.graphQLErrors[0].extensions.exception.message.error;
    } else if (propExists(apolloError, 'graphQLErrors.0.extensions.exception.responses.0.error.message')) {
      errorMessage = apolloError.graphQLErrors[0].extensions.exception.responses[0].error.message;
    } else if (propExists(apolloError, 'graphQLErrors.0..message.error')) {
      errorMessage = (apolloError.graphQLErrors[0].message as any).error;
    } else if (propExists(apolloError, 'message')) {
      errorMessage = apolloError.message;
    }
  }

  return errorMessage;
}

/**
 * add if not exists, and convert title and value to
 * Capital Case and CONSTANT
 */
export const addToAutocomplete = (name: string, control: Control<Record<string, any>>, value: string): void => {
  // clone
  const result: Array<AutocompleteAndSelectOptions> = [...control.getValues(name)];
  const newTitle = capitalCase(value);
  const newValue = constantCase(value);
  if (result.length >= 0) {
    const exists = result.find((e) => e.value === newValue);
    if (!exists) {
      // add to options
      control.setValue(name, [...control.getValues(name),
      { title: newTitle, value: newValue }
      ], { shouldValidate: true });
    }
  }
}

/**
 * helper to get common form buttons
 */
export const generateFormButtonsDiv = (classes: Record<'button' | 'formButtonsDiv', string>, loading: boolean, handleResetHandler: () => void) => {
  return (
    <div className={classes.formButtonsDiv}>
      <Button
        type='submit'
        variant='contained'
        className={classes.button}
        disabled={loading}
      >
        {c.I18N.create}
      </Button>
      <Button
        type='reset'
        variant='contained'
        className={classes.button}
        disabled={loading}
        onClick={() => handleResetHandler()}
      >
        {c.I18N.reset}
      </Button>
    </div>
  );
}

// trick to use generics with jsx, we can use <T> it will be interpreted as jsx
// https://stackoverflow.com/questions/41112313/how-to-use-generics-with-arrow-functions-in-typescript-jsx-with-react?rq=1
// use '<T extends {}>'
// T is FormInputs
export const generateFormDefinition = (formDefinition: any, control: Control<Record<string, any>>, errors: DeepMap<any, FieldError>, loading: boolean/*, setValue?: any*/): JSX.Element[] => recordToArray<FormPropFields>(formDefinition).map((e: FormPropFields) => {
  if (e.visible === false || (typeof e.visible === 'function' && !e.visible(control))) return;
  let returnValue;
  switch (e.type) {
    case FormInputType.TEXT:
    case FormInputType.PASSWORD:
    case FormInputType.DATE:
    case FormInputType.EMAIL:
    case FormInputType.COLOR:
    case FormInputType.DATETIME:
    case FormInputType.FILE:
    case FormInputType.HIDDEN:
    case FormInputType.IMAGE:
    case FormInputType.MONTH:
    case FormInputType.NUMBER:
    case FormInputType.RANGE:
    case FormInputType.TEL:
    case FormInputType.TIME:
    case FormInputType.URL:
    case FormInputType.WEEK:
      returnValue = generateTextField(e, control, errors, loading);
      break
    case FormInputType.SELECT:
      returnValue = generateSelection(e, control, errors, loading);
      break
    case FormInputType.AUTOCOMPLETE:
      returnValue = generateAutocomplete(e, control, errors, loading);
      break
    case FormInputType.CUSTOM:
      returnValue = e.custom;
      break
  }
  return returnValue;
});

export const generateTextField = (e: FormPropFields, control: Control<Record<string, any>>, errors: DeepMap<any, FieldError>, loading: boolean): JSX.Element => {
  // inner function to maintain error cleaner
  const errorHandler = (errors: DeepMap<any, FieldError>, e: FormPropFields) => {
    return (typeof e.errorFn === 'function')
      ? e.errorFn()
      : (errors[(e.name)] !== undefined);
  }
  // inner function to maintain helperText cleaner
  const helperTextHandler = (errors: DeepMap<any, FieldError>, e: FormPropFields) => {
    return (typeof e.helperTextFn === 'function')
      ? e.helperTextFn()
      // show error or errorMessage or helperText
      : (errors[(e.name)] !== undefined) ? errors[(e.name)].message : e.helperText
  }

  return (
    <Fragment key={e.name}>
      <Controller
        as={<TextField inputRef={e.inputRef} {...e.controlProps} />}
        // text | password
        type={e.type}
        control={control}
        name={(e.name as string)}
        label={e.label}
        placeholder={e.placeholder}
        fullWidth={e.fullWidth}
        rules={e.rules}
        disabled={loading || e.disabled}
        // added for custom type
        // error={(errors[(e.name)] !== undefined)}
        error={errorHandler(errors, e)}
        // added for custom type
        // helperText={(errors[(e.name as any)] !== undefined) ? errors[(e.name as any)].message : e.helperText}
        helperText={helperTextHandler(errors, e)}
        // added for custom type
        // onFocus={() => { e.inputRef.current.focus(); }}
        // TODO: Unhandled Rejection (TypeError): Cannot read property 'focus' of null
        // onFocus={() => { (typeof e.onFocusFn === 'function') ? e.onFocusFn() : e.inputRef.current.focus(); }}
        onFocus={() => { (typeof e.onFocusFn === 'function') && e.onFocusFn(); }}
        // added for custom type
        defaultValue={e.defaultValue}
      />
    </Fragment>
  )
}

const generateSelection = (e: FormPropFields, control: Control<Record<string, any>>, errors: DeepMap<any, FieldError>, loading: boolean): JSX.Element => {
  return (
    <Fragment key={e.name}>
      <FormControl variant='outlined' margin='normal' fullWidth={e.fullWidth}>
        <InputLabel id={`${e.name}-select-label`}>{e.label}</InputLabel>
        <Controller
          as={
            <Select
              id={e.name}
              labelId={`${e.name}-select-label`}
              label={e.label}
              inputRef={e.inputRef}
            >
              <MenuItem value={c.VALUES.undefined}>{c.I18N.undefined}</MenuItem>
              {/* use key or value */}
              {e.options && e.options().map((e: AutocompleteAndSelectOptions) => <MenuItem key={e.key ? e.key : e.value} value={e.value}>{e.title}</MenuItem>)}
            </Select>
          }
          // render={({ onChange, onBlur, value, name, ...props }) => (
          //   <Select
          //     id={e.name}
          //     labelId={`${e.name}-select-label`}
          //     label={e.label}
          //     inputRef={e.inputRef}
          //     onChange={(event) => console.log(event.target.value)}
          //   >
          //     <MenuItem value={''}>{c.I18N.none}</MenuItem>
          //     {e.options.map(e => <MenuItem key={e.value} value={e.value}>{e.title}</MenuItem>)}
          //   </Select>
          // )}
          control={control}
          name={e.name}
          error={(errors[(e.name)] !== undefined)}
          // TODO: wip
          placeholder={e.placeholder}
          // TODO: wip
          rules={e.rules}
          disabled={loading || e.disabled}
          onFocus={() => { e.inputRef.current.focus(); }}
        // TODO: this gives the margin problem in console
        // Failed prop type: Invalid prop `margin` of value `normal` supplied to 
        // {...e.controlProps}
        />
        <FormHelperText error={(errors[(e.name as any)] !== undefined)}>{(errors[(e.name as any)] !== undefined) ? errors[(e.name as any)].message : e.helperText}</FormHelperText>
      </FormControl>
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
  interface InputProps {
    onKeyDown: (event: object) => void;
  }

  const handleKeyDown = (event: any) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
      case ',': {
        event.preventDefault();
        event.stopPropagation();
        // 3 chars minimum
        if (event.target.value.length >= 3) {
          // get current control values
          // working version without function helper
          // const newValue = { title: event.target.value, value: (event.target.value as string).toUpperCase() };
          // control.setValue(e.name, [...control.getValues(e.name), newValue], { shouldValidate: true });
          addToAutocomplete(e.name, control, event.target.value);
        }
        break;
      }
      default:
    }
  };

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

  // working but before use cleaner version from codeSandbox
  return (
    <Fragment key={e.name}>
      <Controller
        name={e.name}
        control={control}
        rules={e.rules}
        render={({ onChange, ...props }) => (
          // TODO: use `as` crash when we clear tags
          //  as={
          <Autocomplete
            id={e.name}
            options={e.options()}
            multiple={e.multipleOptions}
            disableCloseOnSelect={e.disableCloseOnSelect}
            filterSelectedOptions
            autoComplete
            autoHighlight
            freeSolo
            getOptionLabel={(option) => (option.title) ? option.title : ''}
            getOptionSelected={(option, value) => option.value === value.value}
            renderOption={(option, { selected }) => (
              <Fragment>
                {e.multipleOptions &&
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                }
                {option.title}
              </Fragment>
            )}
            renderInput={(params: AutocompleteRenderInputParams) => {
              // add listener if addToAutocomplete is enabled
              if (e.addToAutocomplete) {
                (params.inputProps as any).onKeyDown = handleKeyDown;
              }
              return (
                <TextField
                  name={e.name}
                  inputRef={e.inputRef}
                  // variant='outlined'
                  label={e.label}
                  placeholder={e.placeholder}
                  error={(errors[(e.name)] !== undefined)}
                  helperText={(errors[(e.name as any)] !== undefined) ? errors[(e.name as any)].message : e.helperText}
                  {...params}
                  {...e.controlProps}
                />
              )
            }}
            onChange={(e, data) => onChange(data)}
            fullWidth={e.fullWidth}
            disabled={loading || e.disabled}
            onFocus={() => { e.inputRef.current.focus(); }}
            // defaultValue={[e.options[0], e.options[2]]}
            // props is the way to inject default values
            // and Add tags Too, fuck 2 hours to discover it, how to create tags
            {...props}
          />
        )}
      // } // as
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