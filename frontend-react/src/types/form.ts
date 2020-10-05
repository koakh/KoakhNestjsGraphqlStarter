import React from 'react';
import { Validate, ValidationRule, ValidationValueMessage } from 'react-hook-form';
import { PropTypes } from '@material-ui/core';

export enum FormInputType {
  TEXT = 'text',
  PASSWORD = 'password',
  SELECT = 'select',
  AUTOCOMPLETE = 'autocomplete',
};
export type FormInputPropsValue = { name: string, label: string, default: string | number | boolean }
export type FormInputProps = Record<string, FormInputPropsValue>;
export type FormDefaultValues = { [key: string]: string | number | boolean | string[] | any };
export type FormPropFields = {
  as: JSX.Element,
  inputRef: any,
  type: FormInputType,
  name: string,
  label: string;
  defaultValue?: string,
  placeholder?: string,
  helperText?: string,
  fullWidth?: boolean,
  className?: any,
  // pass arbitrary props
  controllProps?: {
    // 'filled' | 'outlined' | 'standard',
    variant?: any,
    margin?: PropTypes.Margin,
    // warn must be capitalized
    InputProps?: any;
  };
  rules?: {
    required?: string | boolean | ValidationValueMessage<boolean>,
    min?: ValidationRule<React.ReactText>,
    max?: ValidationRule<React.ReactText>,
    maxLength?: ValidationRule<React.ReactText>,
    minLength?: ValidationRule<React.ReactText>,
    pattern?: ValidationRule<RegExp>,
    validate?: Validate | Record<string, Validate>
  },
  // autocomplete
  options?: AutocompleteOption[],
  multipleOptions?: boolean,
}

// components
export type AutocompleteOption = { title: string, value: string | number | boolean };

// export type ExtraProps<ClassKey extends string = string> = {
//   formDefinition: Record<string, FormPropFields>;
//   inputProps: InputProps;
//   defaultValues: DefaultValues;
//   useStyles: () => ClassNameMap<ClassKey>;
// }

// export type Props = ExtraProps & RouteComponentProps;
