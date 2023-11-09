import {
  SET_USER_EMAIL,
  SET_USER_OTP,
  SET_USER_PHONE,
  SET_USER_PASSWORD,
  SET_USER_OLD_PASSWORD,
  SET_USER_NAME,
  SET_USER_BIRTHYEAR,
  SET_USER_PLAN,
  SET_USER_COUNTRY,
  SET_USER_PINCODE,
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
  if (action.type === SET_USER_BIRTHYEAR) {
    return { ...state, birthyear: action.payload };
  }
  if (action.type === SET_USER_PLAN) {
    return { ...state, plan: action.payload };
  }
  if (action.type === SET_USER_COUNTRY) {
    return { ...state, country: action.payload };
  }
  if (action.type === SET_USER_PINCODE) {
    return { ...state, pincode: action.payload };
  }

  return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default user_reducer;
