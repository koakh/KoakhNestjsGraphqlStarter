type FormCommonOptions = {
  mode: 'all' | 'onBlur' | 'onChange' | 'onSubmit' | 'onTouched'
}

export const formCommonOptions: FormCommonOptions = {
  // mode: 'onBlur',
  // Validation will trigger on the blur and change events.
  // required to work properly with arrays
  mode: 'all',
}
