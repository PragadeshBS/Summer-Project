import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (data) => {
    setIsLoading(true);
    setError(null);

    axios
      .post("/api/auth/login", data)
      .then((res) => {
        localStorage.setItem("user", res.data.token);
        dispatch({
          type: "LOGIN",
          payload: res.data.token,
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setIsLoading(false);
        setError(err.message);
      });
  };

  return { login, isLoading, error };
};
