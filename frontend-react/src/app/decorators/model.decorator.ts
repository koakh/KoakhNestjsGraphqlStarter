export const formatMetadataKey = Symbol("Properties");

/**
 * Properties
 * @param props 
 */
export const Properties = (props?: { fieldName?: string, returnField?: boolean, map?: Object[], transform?: Function }) => {
  return Reflect.metadata(formatMetadataKey, props);
}

/**
 * getProperties
 * @param target 
 * @param propertyKey 
 */
export const getProperties = (target: any, propertyKey: string) => {
  return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}
