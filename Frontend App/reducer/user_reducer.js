import {
  SET_USER_EMAIL,
  SET_USER_OTP,
  SET_USER_PHONE,
  SET_USER_PASSWORD,
  SET_USER_OLD_PASSWORD,
  SET_USER_NAME,
} from "../action";

const user_reducer = (state, action) => {
  if (action.type === SET_USER_EMAIL) {
    return { ...state, email: action.payload };
  }
  if (action.type === SET_USER_PHONE) {
    return { ...state, phone: action.payload };
  }
  if (action.type === SET_USER_OTP) {
    return { ...state, otp: action.payload };
  }
  if (action.type === SET_USER_PASSWORD) {
    return { ...state, password: action.payload };
  }
  if (action.type === SET_USER_OLD_PASSWORD) {
    return { ...state, oldpassword: action.payload };
  }
  if (action.type === SET_USER_NAME) {
    return { ...state, name: action.payload };
  }


  return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default user_reducer;
