const filterObject = <T extends Record<string, unknown>>(
  object: T,
  keys: Array<keyof T>
): T => {
  return keys.reduce((filteredObject, key) => {
    filteredObject[key] = object[key];
    return filteredObject;
  }, {} as T);
};

export { filterObject };
