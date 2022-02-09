import { useAsync } from "./use-async";
import { User } from "types/user";
import { useEffect } from "react";
import { cleanObject } from "./index";
import { useHttp } from "./http";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<User[]>();

  useEffect(() => {
    run(client("users", { data: cleanObject(param || {}) }));
  }, [param]);
  return result;
};
