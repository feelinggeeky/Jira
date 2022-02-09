import { useEffect, useRef, useState } from "react";
import set = Reflect.set;

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    //TODO 依赖项里加上callback会造成无限循环，这和useCallback以及useMemo有关
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

export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  const oldTitle = useRef(document.title).current;
  // 页面加载时: oldTitle === 原title  'React App'
  // 加载后: oldTitle === 传入的title
  console.log("渲染时的oldTitle", oldTitle);
  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    //页面被卸载的时候调用
    return () => {
      if (!keepOnUnmount) {
        //如果不指定依赖，读到的就是原title
        console.log("卸载的oldTitle", oldTitle);
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);
};
