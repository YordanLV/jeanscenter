import React from "react";
import { Provider } from "mobx-react";

import navStore from "./src/stores/navStore";
import layoutStore from "./src/stores/layoutStore";
import pdpStore from "./src/stores/pdpStore";
import listerStore from "./src/stores/listerStore";
import cartStore from "./src/stores/cartStore";
import authStore from "./src/stores/authStore";
import userStore from "./src/stores/userStore";
import buckarooStore from "./src/stores/buckarooStore";
import searchStore from "./src/stores/searchStore";

const stores = {
  navStore,
  layoutStore,
  pdpStore,
  listerStore,
  cartStore,
  authStore,
  userStore,
  buckarooStore,
  searchStore
};

export default ({ element }) => <Provider {...stores}>{element}</Provider>;
