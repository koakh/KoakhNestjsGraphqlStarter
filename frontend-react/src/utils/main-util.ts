/**
 * convert a generic record type to array
 * @param record a generic record
 */
export const recordToArray = <T>(record: Record<string, T>) => {
  const result: T[] = [];
  for (const key in record) {
    if (record.hasOwnProperty(key)) {
      result.push(record[key]);
    }
  }
  return result;
}

/**
 * check if is a valid enum
 * @param enumType 
 * @param enumKey 
 */
export const isValidEnum = (enumType: any, enumKey: string): boolean => {
  return Object.values(enumType).includes(enumKey);
}

/**
 * generic function to get Enum key from a Enum value
 * @param enumType a typescript Type
 * @param enumValue string value
 */
export const getEnumKeyFromEnumValue = (enumType: any, enumValue: string | number): any => {
  const keys: string[] = Object.keys(enumType).filter((x) => enumType[x] === enumValue);
  if (keys.length > 0) {
    return keys[0];
  } else {
    // throw error to caller function
    // throw new Error(`Invalid enum value '${enumValue}'! Valid enum values are ${Object.keys(myEnum)}`);
    throw new Error(`Invalid enum value '${enumValue}'! Valid enum value(s() are ${Object.values(enumType)}`);
  }
};

/**
 * generic function to get Enum value from a Enum key
 * @param enumType a typescript Type
 * @param enumValue string value
 */
export const getEnumValueFromEnumKey = (enumType: any, enumKey: string | number): any => {
  // use getEnumKeyByEnumValue to get key from value
  const keys = Object.keys(enumType).filter((x) => getEnumKeyFromEnumValue(enumType, enumType[x]) === enumKey);
  if (keys.length > 0) {
    // return value from equality key
    return enumType[keys[0]];
  } else {
    // throw error to caller function
    throw new Error(`Invalid enum key '${enumKey}'! Valid enum key(s() are ${Object.keys(enumType)}`);
  }
};

/**
 * get property name from type, use like this nameof<FormInputs>('firstName'), returns type property
 * @param name property name
 */
export const nameof = <T>(name: keyof T) => name;