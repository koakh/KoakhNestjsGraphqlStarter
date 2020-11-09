import { IconButton, InputAdornment } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityIconOff from '@material-ui/icons/VisibilityOff';
import React, { MutableRefObject } from 'react';
import { appConstants as c } from '..';
import { FormInputType, FormPropFields } from '../../types';
import { commonControlProps, validationMessage, validationRuleRegExHelper } from '../../utils';

// common formDefinition, to be shared in project, where are used in more than one place

// Person

export const commonFormFieldFirstName = (inputRef: MutableRefObject<any>, formFieldName: string): FormPropFields => {
  return {
    inputRef,
    name: formFieldName,
    type: FormInputType.TEXT,
    label: c.I18N.firstNameLabel,
    placeholder: c.I18N.firstNamePlaceHolder,
    helperText: c.I18N.firstNameHelperText,
    fullWidth: true,
    rules: validationRuleRegExHelper(formFieldName, c.REGEXP.name),
    controlProps: commonControlProps,
  }
}
export const commonFormFieldLastName = (inputRef: MutableRefObject<any>, formFieldName: string): FormPropFields => {
  return {
    inputRef,
    name: formFieldName,
    type: FormInputType.TEXT,
    label: c.I18N.lastNameLabel,
    placeholder: c.I18N.lastNamePlaceHolder,
    helperText: c.I18N.lastNameHelperText,
    fullWidth: true,
    rules: validationRuleRegExHelper(formFieldName, c.REGEXP.name),
    controlProps: commonControlProps,
  }
}

export const commonFormFieldUsername = (inputRef: MutableRefObject<any>, formFieldName: string): FormPropFields => {
  return {
    inputRef,
    name: formFieldName,
    type: FormInputType.TEXT,
    label: c.I18N.userNameLabel,
    placeholder: c.I18N.userNamePlaceholder,
    helperText: c.I18N.userNameHelperText,
    fullWidth: true,
    rules: validationRuleRegExHelper(formFieldName, c.REGEXP.name),
    controlProps: commonControlProps,
  }
}

export const commonFormFieldPassword = (inputRef: MutableRefObject<any>, formFieldName: string, showPassword: boolean, handlePasswordVisibility: () => void): FormPropFields => {
  return {
    inputRef,
    name: formFieldName,
    type: (showPassword) ? FormInputType.TEXT : FormInputType.PASSWORD,
    label: c.I18N.passWordLabel,
    placeholder: c.I18N.passWordPlaceholder,
    helperText: c.I18N.passWordHelperText,
    fullWidth: true,
    rules: validationRuleRegExHelper(formFieldName, c.REGEXP.password),
    controlProps: {
      ...commonControlProps,
      // must be capitalized
      InputProps: {
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={handlePasswordVisibility}
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityIconOff />}
            </IconButton>
          </InputAdornment>
        )
      },
    },
  }
}

export const commonFormFieldPasswordConfirmation = (inputRef: MutableRefObject<any>, formFieldName: string, showPassword: boolean, validate: () => boolean): FormPropFields => {
  return {
    inputRef,
    name: formFieldName,
    type: (showPassword) ? FormInputType.TEXT : FormInputType.PASSWORD,
    label: c.I18N.passWordConfirmationLabel,
    placeholder: c.I18N.passWordConfirmationPlaceholder,
    helperText: c.I18N.passWordConfirmationHelperText,
    fullWidth: true,
    rules: {
      ...validationRuleRegExHelper(formFieldName, c.REGEXP.password),
      validate: () => validate()
    },
    controlProps: commonControlProps,
  }
}

export const commonFormFieldFiscalNumber = (inputRef: MutableRefObject<any>, formFieldName: string): FormPropFields => {
  return {
    inputRef,
    name: formFieldName,
    type: FormInputType.TEXT,
    label: c.I18N.fiscalNumberLabel,
    placeholder: c.I18N.fiscalNumberPlaceHolder,
    fullWidth: true,
    rules: validationRuleRegExHelper(formFieldName, c.REGEXP.fiscalNumber),
    controlProps: commonControlProps,
  }
}

export const commonFormFieldMobilePhone = (inputRef: MutableRefObject<any>, formFieldName: string): FormPropFields => {
  return {
    inputRef,
    name: formFieldName,
    type: FormInputType.TEXT,
    label: c.I18N.mobilePhoneLabel,
    placeholder: c.I18N.mobilePhonePlaceHolder,
    fullWidth: true,
    rules: validationRuleRegExHelper(formFieldName, c.REGEXP.mobilePhone),
    controlProps: commonControlProps,
  }
}

export const commonFormFieldEmail = (inputRef: MutableRefObject<any>, formFieldName: string): FormPropFields => {
  return {
    inputRef,
    name: formFieldName,
    type: FormInputType.EMAIL,
    label: c.I18N.emailLabel,
    placeholder: c.I18N.emailPlaceHolder,
    fullWidth: true,
    rules: validationRuleRegExHelper(formFieldName, c.REGEXP.email),
    controlProps: commonControlProps,
  }
}

// asset

export const commonFormFieldAssetName = (inputRef: MutableRefObject<any>, formFieldName: string): FormPropFields => {
  return {
    inputRef,
    name: formFieldName,
    type: FormInputType.TEXT,
    controlProps: commonControlProps,
    fullWidth: true,
    label: c.I18N.assetLabel,
    placeholder: c.I18N.assetPlaceHolder,
    rules: validationRuleRegExHelper(formFieldName, c.REGEXP.name),
  }
}

// asset

export const commonFormFieldCauseName = (inputRef: MutableRefObject<any>, formFieldName: string): FormPropFields => {
  return {
    inputRef,
    name: formFieldName,
    type: FormInputType.TEXT,
    controlProps: commonControlProps,
    fullWidth: true,
    label: c.I18N.causeLabel,
    placeholder: c.I18N.causePlaceHolder,
    rules: validationRuleRegExHelper(formFieldName, c.REGEXP.name),
  }
}

// shared

export const commonFormFieldCode = (inputRef: MutableRefObject<any>, formFieldName: string): FormPropFields => {
  return {
    inputRef,
    name: formFieldName,
    type: FormInputType.TEXT,
    controlProps: commonControlProps,
    fullWidth: true,
    label: c.I18N.codeLabel,
    placeholder: c.I18N.codePlaceHolder,
    rules: validationRuleRegExHelper(formFieldName, c.REGEXP.alphaNumeric),
  }
}

export const commonFormFieldLocation = (inputRef: MutableRefObject<any>, formFieldName: string): FormPropFields => {
  return {
    inputRef,
    name: formFieldName,
    type: FormInputType.TEXT,
    controlProps: commonControlProps,
    fullWidth: true,
    label: c.I18N.locationLabel,
    placeholder: c.I18N.locationPlaceHolder,
    rules: validationRuleRegExHelper(formFieldName, c.REGEXP.location, false),
  }
}

export const commonFormFieldAmbassadors = (inputRef: MutableRefObject<any>, formFieldName: string, validate: () => boolean | string): FormPropFields => {
  return {
    inputRef,
    name: formFieldName,
    type: FormInputType.TEXT,
    controlProps: commonControlProps,
    fullWidth: true,
    label: c.I18N.ambassadorsLabel,
    placeholder: c.I18N.ambassadorsPlaceHolder,
    helperText: c.I18N.ambassadorsHelperText,
    rules: {
      validate: () => validate()
    },
  }
}

export const commonFormFieldMetadata = (inputRef: MutableRefObject<any>, formFieldName: string, validate: () => boolean): FormPropFields => {
  return {
    inputRef,
    name: formFieldName,
    type: FormInputType.TEXT,
    controlProps: commonControlProps,
    fullWidth: true,
    label: c.I18N.metaDataLabel,
    placeholder: c.I18N.metaDataPlaceHolder,
    rules: {
      validate: () => validate()
        ? true
        : validationMessage('invalid', formFieldName)
    },
  }
}

export const commonFormFieldMetadataInternal = (inputRef: MutableRefObject<any>, formFieldName: string, validate: () => boolean): FormPropFields => {
  return {
    ...commonFormFieldMetadata(inputRef, formFieldName, validate),
    inputRef,
    name: formFieldName,
    label: c.I18N.metaDataInternalLabel,
    placeholder: c.I18N.metaDataPlaceHolder,
  }
}

export const commonFormFieldStartDate = (inputRef: MutableRefObject<any>, formFieldName: string): FormPropFields => {
  return {
    inputRef,
    name: formFieldName,
    type: FormInputType.DATE,
    controlProps: commonControlProps,
    fullWidth: true,
    label: c.I18N.startDateLabel,
    placeholder: c.I18N.datePlaceHolder,
    rules: validationRuleRegExHelper(formFieldName, c.REGEXP.date),
  }
}

export const commonFormFieldEndDate = (inputRef: MutableRefObject<any>, formFieldName: string): FormPropFields => {
  return {
    ...commonFormFieldStartDate(inputRef, formFieldName),
    inputRef,
    name: formFieldName,
    label: c.I18N.endDateLabel,
    placeholder: c.I18N.endPlaceHolder,
  }
}

export const commonFormFieldInputTypeEntity = (inputRef: MutableRefObject<any>, formFieldName: string, validate: () => boolean): FormPropFields => {
  return {
    inputRef,
    name: formFieldName,
    type: FormInputType.SELECT,
    controlProps: commonControlProps,
    fullWidth: true,
    label: c.I18N.inputTypeLabel,
    disabled: false,
    options: () => c.PARTICIPANT_PERSON_ENTITY_TYPE_OPTIONS,
    rules: {
      validate: () => validate()
        ? true
        : validationMessage('required', formFieldName)
    },
  }
}

export const commonFormFieldInputEntity = (inputRef: MutableRefObject<any>, formFieldName: string, validate: () => boolean): FormPropFields => {
  return {
    inputRef,
    name: formFieldName,
    type: FormInputType.TEXT,
    controlProps: commonControlProps,
    fullWidth: true,
    label: c.I18N.inputLabel,
    placeholder: c.I18N.inputPlaceholder,
    helperText: c.I18N.inputHelperText,
    disabled: false,
    rules: {
      validate: () => validate()
        ? true
        : validationMessage('required', formFieldName)
    },
  }
}

export const commonFormFieldTags = (inputRef: MutableRefObject<any>, formFieldName: string, validate: () => boolean): FormPropFields => {
  return {
    inputRef,
    type: FormInputType.AUTOCOMPLETE,
    name: formFieldName,
    controlProps: commonControlProps,
    fullWidth: true,
    label: c.I18N.tagsLabel,
    placeholder: c.I18N.tagsLabel,
    helperText: c.I18N.tagsPlaceHolder,
    options: () => c.TAGS_OPTIONS,
    multipleOptions: true,
    addToAutocomplete: true,
    rules: {
      validate: () => validate()
        ? true
        : validationMessage('invalid', formFieldName)
    },
  }
}
