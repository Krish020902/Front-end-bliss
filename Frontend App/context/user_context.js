import React, { useContext, useReducer } from "react";
import user_reducer from "../reducer/user_reducer";
import {
  SET_USER_EMAIL,
  SET_USER_OTP,
  SET_USER_PHONE,
  SET_USER_PASSWORD,
  SET_USER_OLD_PASSWORD,
  SET_USER_NAME
} from "../action";

const initialState = {
  email: "",
  phone: "",
  otp: "",
  password: "",
  oldpassword:"",
  name:""
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
  const setUserOldPassword = (val) => {
    dispath({ type: SET_USER_OLD_PASSWORD, payload: val });
  };
  const setUserName = (val) => {
    dispath({ type: SET_USER_NAME, payload: val });
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        setUserEmail,
        setUserPhone,
        setUserOtp,
        setUserPassword,
        setUserOldPassword,
        setUserName
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
