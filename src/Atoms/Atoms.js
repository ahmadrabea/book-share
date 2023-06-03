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
  categoryId: atom({
    key: "categoriesId",
    default: "",
  }),
  SelectedStatus: atom({
    key: "SelectedStatus",
    default: null,
  }),
  cards: atom({
    key: "cards",
    default: [],
  }),
  bookCategories: atom({
    key: "bookCategories",
    default: [],
  }),
  order: atom({
    key: "order",
    default: "Newest",
  }),
  searchTerm: atom({
    key: "searchTerm",
    default: "",
  }),
};

export default Atoms;

// const loggedInState = atom({
//   key: "loginState",
//   default: false,
// });
