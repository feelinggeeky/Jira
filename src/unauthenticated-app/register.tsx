import React, { FormEvent } from "react";
import { useAuth } from "context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;

export const RegisterScreen = () => {
  // const login = (param: { username: string; password: string }) => {
  //   fetch(`${apiUrl}/login`, {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     body: JSON.stringify(param),
  //   }).then(async (response) => {
  //     if (response.ok) {
  //     }
  //   });
  // };
  const { register, user } = useAuth();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = (e.currentTarget.elements[0] as HTMLFormElement).value;
    const password = (e.currentTarget.elements[1] as HTMLFormElement).value;
    register({ username, password });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor={"username"}>用户名</label>
        <input type={"text"} id={"username"} />
      </div>
      <div>
        <label htmlFor={"password"}>用户名</label>
        <input type={"password"} id={"password"} />
      </div>
      <button type={"submit"}>注册</button>
    </form>
  );
};
