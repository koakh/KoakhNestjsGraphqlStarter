import { ElapsedTime } from "../types";

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
 * check if is a valid json object
 */
export const isValidJsonObject = (json: string): boolean => {
  try {
    JSON.parse(json);
    // console.log(JSON.stringify(parsed));
  } catch (error) {
    return false;
  }
  return true;
}

/**
 * check if is a valid enum
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

export const calcElapsedTime = (start: Date, end: Date): ElapsedTime => {
  const elapsedMs: number = (end.getTime() - start.getTime());
  const elapsed = new Date(elapsedMs);
  // subtract the timezone offset, else we have 1h and not 0h
  elapsed.setTime(elapsed.getTime() + elapsed.getTimezoneOffset() * 60 * 1000);
  const elapsedHours = elapsed.getHours();
  const elapsedMinutes = elapsed.getMinutes();
  const elapsedSeconds = elapsed.getSeconds();

  return { hours: elapsedHours, minutes: elapsedMinutes, seconds: elapsedSeconds, ms: elapsedMs };
};

/**
 * Simple func to format Date
 */
export const currentFormatedDate = (date: Date, withTime: boolean = true): string => {
  const yy: string = date.getUTCFullYear().toString();
  const mo: string = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const dd: string = date.getUTCDate().toString().padStart(2, '0');
  const hh: string = date.getUTCHours().toString().padStart(2, '0');
  const mm: string = date.getUTCMinutes().toString().padStart(2, '0');
  const ss: string = date.getUTCSeconds().toString().padStart(2, '0');
  return (withTime)
    ? `${yy}-${mo}-${dd} ${hh}:${mm}:${ss}`
    : `${yy}-${mo}-${dd}`;
};

/**
 * get property name from type, use like this nameof<FormInputs>('firstName'), returns type property
 * @param name property name
 */
export const nameof = <T>(name: keyof T) => name;