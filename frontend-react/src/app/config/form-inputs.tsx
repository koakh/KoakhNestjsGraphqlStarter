import { Button, Grid, IconButton, InputAdornment } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import RemoveIcon from '@material-ui/icons/Remove';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityIconOff from '@material-ui/icons/VisibilityOff';
import React, { Fragment, MutableRefObject } from 'react';
import { ArrayField, Control, DeepMap, FieldError } from 'react-hook-form';
import { appConstants as c } from '..';
import { AutocompleteAndSelectOptions, CurrencyCode, EntityType, FormInputType, FormPropFields, GoodsBagItem } from '../../types';
import { commonControlProps, generateTextField, validationBarCodeExHelper, validationMessage, validationRuleRegExHelper } from '../../utils';

// common formDefinition, to be shared in project, where are used in more than one place

// Person

export const commonFormFieldFirstName = (inputRef: MutableRefObject<any>, formFieldName: string): FormPropFields => {
  return {
    inputRef,
    type: FormInputType.TEXT,
    name: formFieldName,
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
    type: FormInputType.TEXT,
    name: formFieldName,
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
    type: FormInputType.TEXT,
    name: formFieldName,
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
    type: (showPassword) ? FormInputType.TEXT : FormInputType.PASSWORD,
    name: formFieldName,
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
    type: (showPassword) ? FormInputType.TEXT : FormInputType.PASSWORD,
    name: formFieldName,
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

export const commonFormFieldFiscalNumber = (inputRef: MutableRefObject<any>, formFieldName: string, validate: () => boolean): FormPropFields => {
  return {
    inputRef,
    type: FormInputType.TEXT,
    name: formFieldName,
    label: c.I18N.fiscalNumberLabel,
    placeholder: c.I18N.fiscalNumberPlaceHolder,
    fullWidth: true,
    // rules: validationRuleRegExHelper(formFieldName, c.REGEXP.fiscalNumber),
    rules: {
      validate: () => validate()
        ? true
        : validationMessage('required', formFieldName)
    },    
    controlProps: commonControlProps,
  }
}

export const commonFormFieldMobilePhone = (inputRef: MutableRefObject<any>, formFieldName: string): FormPropFields => {
  return {
    inputRef,
    type: FormInputType.TEXT,
    name: formFieldName,
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
    type: FormInputType.EMAIL,
    name: formFieldName,
    label: c.I18N.emailLabel,
    placeholder: c.I18N.emailPlaceHolder,
    fullWidth: true,
    rules: validationRuleRegExHelper(formFieldName, c.REGEXP.email),
    controlProps: commonControlProps,
  }
}

// asset

export const commonFormFieldAssetType = (inputRef: MutableRefObject<any>, formFieldName: string, validate: () => boolean): FormPropFields => {
  return {
    inputRef,
    type: FormInputType.SELECT,
    name: formFieldName,
    label: c.I18N.assetTypeLabel,
    controlProps: commonControlProps,
    fullWidth: true,
    rules: {
      validate: () => validate()
        ? true
        : validationMessage('required', formFieldName)
    },
    options: () => c.ASSET_TYPE_OPTIONS,
  }
}

export const commonFormFieldAssetName = (inputRef: MutableRefObject<any>, formFieldName: string): FormPropFields => {
  return {
    inputRef,
    type: FormInputType.TEXT,
    name: formFieldName,
    label: c.I18N.assetLabel,
    controlProps: commonControlProps,
    fullWidth: true,
    placeholder: c.I18N.assetPlaceHolder,
    rules: validationRuleRegExHelper(formFieldName, c.REGEXP.name),
  }
}

// cause

export const commonFormFieldCauseName = (inputRef: MutableRefObject<any>, formFieldName: string): FormPropFields => {
  return {
    inputRef,
    type: FormInputType.TEXT,
    name: formFieldName,
    label: c.I18N.causeLabel,
    controlProps: commonControlProps,
    fullWidth: true,
    placeholder: c.I18N.causePlaceHolder,
    rules: validationRuleRegExHelper(formFieldName, c.REGEXP.name),
  }
}

export const commonFormFieldAssetOwner = (inputRef: MutableRefObject<any>, formFieldName: string, validate: () => boolean): FormPropFields => {
  return {
    inputRef,
    type: FormInputType.TEXT,
    name: formFieldName,
    label: c.I18N.ownerLabel,
    controlProps: commonControlProps,
    fullWidth: true,
    placeholder: c.I18N.ownerPlaceholder,
    helperText: c.I18N.ownerHelperText,
    rules: {
      // validate both regex uuid, fiscalNumber and mobilePhone
      validate: () => validate()
        ? true
        : validationMessage('required', formFieldName)
    },
  }
}

// simplified version to work in cause
export const commonFormFieldPersonNdParticipantInputTypeEntity = (inputRef: MutableRefObject<any>, formFieldName: string, validate: () => boolean): FormPropFields => {
  return {
    inputRef,
    type: FormInputType.SELECT,
    name: formFieldName,
    label: c.I18N.inputTypeLabel,
    controlProps: commonControlProps,
    fullWidth: true,
    disabled: false,
    options: () => c.PARTICIPANT_PERSON_ENTITY_TYPE_OPTIONS,
    rules: {
      validate: () => validate()
        ? true
        : validationMessage('required', formFieldName)
    },
  }
}

// simplified version to work in cause
export const commonFormFieldCauseInputEntity = (inputRef: MutableRefObject<any>, formFieldName: string, validate: () => boolean): FormPropFields => {
  return {
    inputRef,
    type: FormInputType.TEXT,
    name: formFieldName,
    label: c.I18N.inputLabel,
    controlProps: commonControlProps,
    fullWidth: true,
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


// shared

export const commonFormFieldCode = (inputRef: MutableRefObject<any>, formFieldName: string): FormPropFields => {
  return {
    inputRef,
    type: FormInputType.TEXT,
    name: formFieldName,
    label: c.I18N.codeLabel,
    controlProps: commonControlProps,
    fullWidth: true,
    placeholder: c.I18N.codePlaceHolder,
    rules: validationRuleRegExHelper(formFieldName, c.REGEXP.alphaNumeric),
  }
}

export const commonFormFieldLocation = (inputRef: MutableRefObject<any>, formFieldName: string): FormPropFields => {
  return {
    inputRef,
    type: FormInputType.TEXT,
    name: formFieldName,
    label: c.I18N.locationLabel,
    controlProps: commonControlProps,
    fullWidth: true,
    placeholder: c.I18N.locationPlaceHolder,
    rules: validationRuleRegExHelper(formFieldName, c.REGEXP.location, false),
  }
}

export const commonFormFieldAmbassadors = (inputRef: MutableRefObject<any>, formFieldName: string, validate: () => boolean | string): FormPropFields => {
  return {
    inputRef,
    type: FormInputType.TEXT,
    name: formFieldName,
    label: c.I18N.ambassadorsLabel,
    controlProps: commonControlProps,
    fullWidth: true,
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
    type: FormInputType.TEXT,
    name: formFieldName,
    label: c.I18N.metaDataLabel,
    controlProps: commonControlProps,
    fullWidth: true,
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
    type: FormInputType.DATE,
    name: formFieldName,
    label: c.I18N.startDateLabel,
    controlProps: commonControlProps,
    fullWidth: true,
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

// TODO deprecated now re-use output
// export const commonFormFieldInputTypeEntity = (inputRef: MutableRefObject<any>, formFieldName: string, validate: () => boolean): FormPropFields => {
//   return {
//     inputRef,
//     type: FormInputType.SELECT,
//     name: formFieldName,
//     label: c.I18N.inputTypeLabel,
//     controlProps: commonControlProps,
//     fullWidth: true,
//     disabled: false,
//     options: () => c.PARTICIPANT_PERSON_ENTITY_TYPE_OPTIONS,
//     rules: {
//       validate: () => validate()
//         ? true
//         : validationMessage('required', formFieldName)
//     },
//   }
// }

// export const commonFormFieldInputEntity = (inputRef: MutableRefObject<any>, formFieldName: string, validate: () => boolean): FormPropFields => {
//   return {
//     inputRef,
//     type: FormInputType.TEXT,
//     name: formFieldName,
//     label: c.I18N.inputLabel,
//     controlProps: commonControlProps,
//     fullWidth: true,
//     placeholder: c.I18N.inputPlaceholder,
//     helperText: c.I18N.inputHelperText,
//     disabled: false,
//     rules: {
//       validate: () => validate()
//         ? true
//         : validationMessage('required', formFieldName)
//     },
//   }
// }

// TODO refactor to commonInputOutput, remove label, required in arg
export const commonFormFieldOutputTypeEntity = (inputRef: MutableRefObject<any>, formFieldName: string, validate: () => boolean): FormPropFields => {
  return {
    inputRef,
    type: FormInputType.SELECT,
    name: formFieldName,
    label: c.I18N.outputTypeLabel,
    controlProps: commonControlProps,
    fullWidth: true,
    rules: {
      validate: () => validate()
        ? true
        : validationMessage('required', formFieldName)
    },
    options: () => c.ENTITY_TYPE_OPTIONS,
  }
}

// TODO refactor to commonInputOutput, remove label, required in arg
// render a selection or input based on currentEntityType
// validate is only used in text input, optional for selection
export const commonFormFieldOutputEntity = (inputRef: MutableRefObject<any>, formFieldName: string, currentEntityType: EntityType, options: () => AutocompleteAndSelectOptions[], visible: () => boolean, validate?: () => boolean): FormPropFields => {
  return (currentEntityType === EntityType.cause)
    ? {
      inputRef,
      type: FormInputType.SELECT,
      name: formFieldName,
      label: c.I18N.outputLabel,
      controlProps: commonControlProps,
      fullWidth: true,
      rules: validationRuleRegExHelper(formFieldName, c.REGEXP.uuid),
      // args
      options,
      visible,
    }
    : {
      inputRef,
      type: FormInputType.TEXT,
      name: formFieldName,
      label: c.I18N.outputLabel,
      controlProps: commonControlProps,
      fullWidth: true,
      placeholder: c.I18N.outputPlaceholder,
      helperText: c.I18N.outputHelperText,
      rules: {
        validate: () => validate()
          ? true
          : validationMessage('required', formFieldName)
      },
      visible,
    }
}

// export const commonFormFieldInputTypeEntity = (inputRef: MutableRefObject<any>, formFieldName: string, validate: () => boolean): FormPropFields => {
//   return {
//     ...commonFormFieldOutputTypeEntity(inputRef, formFieldName, validate),
//     label: c.I18N.inputTypeLabel,
//   }
// }

// export const commonFormFieldInputEntity = (inputRef: MutableRefObject<any>, formFieldName: string, currentEntityType: EntityType, options: () => AutocompleteAndSelectOptions[], visible: () => boolean, validate?: () => boolean): FormPropFields => {
//   return {
//     ...commonFormFieldOutputEntity(inputRef, formFieldName, currentEntityType, disabled, options, visible),
//     label: c.I18N.inputLabel,
//   }
// }

export const commonFormFieldTags = (inputRef: MutableRefObject<any>, formFieldName: string, validate: () => boolean): FormPropFields => {
  return {
    inputRef,
    type: FormInputType.AUTOCOMPLETE,
    name: formFieldName,
    label: c.I18N.tagsLabel,
    controlProps: commonControlProps,
    fullWidth: true,
    placeholder: c.I18N.tagsLabel,
    helperText: c.I18N.tagsPlaceHolder,
    rules: {
      validate: () => validate()
        ? true
        : validationMessage('invalid', formFieldName)
    },
    options: () => c.TAGS_OPTIONS,
    multipleOptions: true,
    addToAutocomplete: true,
  }
}

// transaction

export const commonFormFieldAssetId = (inputRef: MutableRefObject<any>, formFieldName: string, visible: () => boolean): FormPropFields => {
  return {
    inputRef,
    type: FormInputType.TEXT,
    name: formFieldName,
    label: c.I18N.assetIdLabel,
    controlProps: commonControlProps,
    fullWidth: true,
    placeholder: c.I18N.assetIdPlaceholder,
    helperText: c.I18N.assetIdHelperText,
    rules: validationRuleRegExHelper(formFieldName, c.REGEXP.uuid),
    disabled: false,
    // args
    visible,
  }
}

export const commonFormFieldQuantity = (inputRef: MutableRefObject<any>, formFieldName: string, visible: () => boolean): FormPropFields => {
  return {
    inputRef,
    type: FormInputType.NUMBER,
    name: formFieldName,
    label: c.I18N.quantityLabel,
    controlProps: commonControlProps,
    fullWidth: true,
    placeholder: c.I18N.quantityPlaceHolder,
    rules: validationRuleRegExHelper(formFieldName, c.REGEXP.floatPositive),
    // args
    visible,
  }
}

export const commonFormFieldCurrency = (inputRef: MutableRefObject<any>, formFieldName: string, validate: () => boolean, visible: () => boolean): FormPropFields => {
  return {
    inputRef,
    type: FormInputType.SELECT,
    name: formFieldName,
    controlProps: commonControlProps,
    fullWidth: true,
    label: c.I18N.currencyLabel,
    rules: {
      validate: () => validate()
        ? true
        : validationMessage('required', formFieldName)
    },
    options: () => [
      { title: c.I18N.currencyCodeEur, value: CurrencyCode.eur },
      { title: c.I18N.currencyCodeUsd, value: CurrencyCode.usd },
    ],
    visible,
  }
}

export const commonFormFieldGoodsBagInput = (inputRef: MutableRefObject<any>, formFieldName: string, custom: JSX.Element, visible?: () => boolean): FormPropFields => {
  return {
    inputRef,
    type: FormInputType.CUSTOM,
    name: formFieldName,
    label: 'Goods bag',
    controlProps: commonControlProps,
    fullWidth: true,
    placeholder: 'Goods placeHolder',
    // custom
    custom,
    // args
    visible
  }
}

export const commonFormFieldGoodsBagEan = (disabled: boolean): FormPropFields => {
  return {
    // inputRef: refs // will be initialized in fieldsMap
    type: FormInputType.TEXT,
    name: null,
    label: c.I18N.barCodeEan13Label,
    controlProps: commonControlProps,
    fullWidth: true,
    placeholder: c.I18N.barCodeEan13PlaceHolder,
    helperText: c.I18N.barCodeEan13HelperText,
    // args
    disabled,
  }
}

export const commonFormFieldGoodsBagQuantity = (disabled: boolean): FormPropFields => {
  return {
    // inputRef: refs // will be initialized in fieldsMap
    name: null,
    type: FormInputType.TEXT,
    label: c.I18N.quantityLabel,
    controlProps: commonControlProps,
    fullWidth: true,
    placeholder: c.I18N.quantityPlaceHolder,
    // args
    disabled,
  }
}

/**
 * this will render jsx and not a common FormPropFields 
 * @param disabled 
 */
export const commonFormFieldGoodsBag = (
  // FormFieldNames.GOODS_BAG was replaced with formFieldName
  formFieldName: string,
  // useStyles
  classes: any,
  // useForm,
  control: Control<any>,
  errors: DeepMap<any, FieldError>,
  // useFieldArray
  remove: (index?: number | number[]) => void,
  append: (value: Partial<Record<string, any>> | Partial<Record<string, any>>[], shouldFocus?: boolean) => void,
  handleIncreaseDecreaseGood: (goodsBagArg: Array<GoodsBagItem>, index: number, value: number) => void,
  // other
  loading: boolean,
  fields: Partial<ArrayField<Record<string, any>>>,
  goodsBag: any[],
  goodsBagEan: FormPropFields,
  goodsBagQuantity: FormPropFields,
  goodsBagEanInputRef: any[],
  goodsBagQuantityInputRef: any[],
  causeOptionsLoaded: boolean,
  maxGoodsItems: number,
): JSX.Element => {
  // required a key `key='goods'`, this belongs to the loop of form components, without it we have errors
  return (<Fragment key='goods'>
    {fields.map((item: any, index: number) => {
      return (
        <Grid key={item.id} container spacing={3}>
          <Grid item xs>
            {generateTextField({
              ...goodsBagEan,
              inputRef: goodsBagEanInputRef[index],
              name: `goodsBag[${index}].barCode`,
              defaultValue: item.barCode,
              rules: validationBarCodeExHelper(`goodsBag[${index}].barCode`, goodsBag[index]),
              helperTextFn: () => errors[formFieldName] && errors[formFieldName][index] && errors[formFieldName][index].barCode !== undefined
                ? errors[formFieldName][index].barCode.message
                : goodsBagEan.helperText,
              errorFn: () => errors[formFieldName] && errors[formFieldName][index] && errors[formFieldName][index].barCode !== undefined,
              onFocusFn: () => goodsBagEanInputRef[index].current.focus()
            }, control, errors, loading)}
          </Grid>
          <Grid item xs={3}>
            {generateTextField({
              ...goodsBagQuantity,
              inputRef: goodsBagQuantityInputRef[index],
              name: `goodsBag[${index}].quantity`,
              defaultValue: item.quantity,
              rules: validationRuleRegExHelper(`goodsBag[${index}].quantity`, c.REGEXP.integerPositiveNonZero),
              helperTextFn: () => errors[formFieldName] && errors[formFieldName][index] && errors[formFieldName][index].quantity !== undefined
                ? errors[formFieldName][index].quantity.message
                : '',
              errorFn: () => errors[formFieldName] && errors[formFieldName][index] && errors[formFieldName][index].quantity !== undefined,
              onFocusFn: () => goodsBagQuantityInputRef[index].current.focus(),
            }, control, errors, loading)}
          </Grid>
          {/* the trick is using auto in buttons */}
          <Grid item xs='auto'>
            <IconButton
              className={classes.buttonGoodsActions}
              aria-label={c.I18N.decrease}
              disabled={loading || (goodsBag[index] && goodsBag[index].quantity <= 1)}
              onClick={() => handleIncreaseDecreaseGood(goodsBag, index, -1)}
              size='small'
            >
              <RemoveIcon />
            </IconButton>
            <IconButton
              className={classes.buttonGoodsActions}
              aria-label={c.I18N.increase}
              disabled={loading}
              onClick={() => handleIncreaseDecreaseGood(goodsBag, index, 1)}
              size='small'
            >
              <AddIcon />
            </IconButton>
            <IconButton
              className={classes.buttonGoodsActions}
              aria-label={c.I18N.delete}
              disabled={loading || index === 0}
              onClick={() => remove(index)}
              size='small'
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      );
    })}
    <Button
      type='button'
      variant='contained'
      className={classes.buttonGoodsAdd}
      disabled={loading || !causeOptionsLoaded || fields.length === maxGoodsItems}
      onClick={() => append({ barCode: '', quantity: 1 })}
    >
      {c.I18N.add}
    </Button>
  </Fragment>)
}
