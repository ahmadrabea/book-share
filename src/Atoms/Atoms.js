import { atom } from "recoil";

const Atoms = {
  loggedInState: atom({
    key: "loginState",
    default: false,
  }),
};

export default Atoms;

// const loggedInState = atom({
//   key: "loginState",
//   default: false,
// });
