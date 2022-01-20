import { useEffect, useState } from "react";
import set = Reflect.set;

export const isFalsy = (value: any) => (value === 0 ? false : !value);

export const cleanObject = (object: object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    // @ts-ignore
    const value = result[key];
    if (isFalsy(value)) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};
export const useArray = <T>(initArray: Array<T>) => {
  const [value, setValue] = useState(initArray);
  const clear = () => {
    setValue([]);
  };
  const removeIndex = (index: number) => {
    const copy = [...value];
    setValue(copy.splice(index, 1));
  };
  const add = (item: T) => {
    setValue([...value, item]);
  };
  return { value, setValue, clear, removeIndex, add };
};

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debouncedValue;
};

const debounce = (func: () => void, delay?: number) => {
  let timeout: number;
  return (...param: any) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(function () {
      // @ts-ignore
      func(...param);
    }, delay);
  };
};
