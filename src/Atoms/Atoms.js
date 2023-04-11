import { atom } from "recoil";

const Atoms = {
  loggedInState: atom({
    key: "loginState",
    default: false,
  }),
  tokenState: atom({
    key: "token",
    default: "",
  }),
  userInfo: atom({
    key: "userInfo",
    default: "",
  }),
  successfulRegMessage: atom({
    key: "successfulRegMessage",
    default: "",
  }),
};

export default Atoms;

// const loggedInState = atom({
//   key: "loginState",
//   default: false,
// });
