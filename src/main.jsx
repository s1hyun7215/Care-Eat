// main.jsx

import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import App from "./App.jsx";
import rootReducer from "./modules/index.jsx";
import "./styles/global.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = createStore(rootReducer, composeWithDevTools());

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
