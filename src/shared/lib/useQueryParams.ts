import { useSearchParams } from "react-router-dom";
import type { QueryValue, QueryValues, SetParams } from "../types/queries";

export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const get = (key: string): string | null => {
    return searchParams.get(key);
  };

  const getAll = (key: string): string[] => {
    return searchParams.getAll(key);
  };

  const has = (key: string): boolean => {
    return searchParams.has(key);
  };

  const set = (key: string, value: QueryValues): void => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      next.delete(key);

      if (Array.isArray(value)) {
        value.forEach((item) => {
          next.append(key, String(item));
        });
      } else {
        next.set(key, String(value));
      }

      return next;
    }, { replace: true });
  };

  const setMany = (params: SetParams): void => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === undefined) {
          next.delete(key);
          return;
        }

        next.delete(key);

        if (Array.isArray(value)) {
          value.forEach((item) => {
            next.append(key, String(item));
          });
        } else {
          next.set(key, String(value));
        }
      });

      return next;
    }, { replace: true });
  };

  const remove = (key: string): void => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      next.delete(key);

      return next;
    }, { replace: true });
  };

  const removeValue = (key: string, value: QueryValue): void => {
    setSearchParams((prev) => {
      const next = new URLSearchParams();

      for (const [currentKey, currentValue] of prev.entries()) {
        if (currentKey === key && currentValue === String(value)) {
          continue;
        }

        next.append(currentKey, currentValue);
      }

      return next;
    }, { replace: true });
  };

  const removeValues = (key: string, values: QueryValue[]): void => {
    const valuesToRemove = new Set(values.map(String));

    setSearchParams((prev) => {
      const next = new URLSearchParams();

      for (const [currentKey, currentValue] of prev.entries()) {
        if (currentKey === key && valuesToRemove.has(currentValue)) {
          continue;
        }

        next.append(currentKey, currentValue);
      }

      return next;
    }, { replace: true });
  };

  const clear = (): void => {
    setSearchParams({}, { replace: true });
  };

  return {
    get,
    getAll,
    has,
    set,
    setMany,
    remove,
    removeValue,
    removeValues,
    clear,
  };
};