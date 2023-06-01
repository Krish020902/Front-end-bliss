import React, { useContext, useReducer } from "react";
import user_reducer from "../reducer/user_reducer";
import {
  SET_USER_EMAIL,
  SET_USER_OTP,
  SET_USER_PHONE,
  SET_USER_PASSWORD,
} from "../action";

const initialState = {
  email: "",
  phone: "",
  otp: "",
  password: "",
};

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [state, dispath] = useReducer(user_reducer, initialState);

  const setUserEmail = (val) => {
    dispath({ type: SET_USER_EMAIL, payload: val });
  };
  const setUserPhone = (val) => {
    dispath({ type: SET_USER_PHONE, payload: val });
  };
  const setUserOtp = (val) => {
    dispath({ type: SET_USER_OTP, payload: val });
  };
  const setUserPassword = (val) => {
    dispath({ type: SET_USER_PASSWORD, payload: val });
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        setUserEmail,
        setUserPhone,
        setUserOtp,
        setUserPassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
