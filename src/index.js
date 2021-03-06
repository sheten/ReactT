import React from "react";
import ReactDOM from "react-dom";

import * as serviceWorker from "./serviceWorker";
import Firebase, { FirebaseContext } from "./components/Firebase";
import { Provider } from "react-redux";
import { createStore } from "redux";

import App from "./components/App";
import rootReducer from "./Reducers/rootReducer";

import "./index.css";

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <FirebaseContext.Provider value={new Firebase()}>
      <App />
    </FirebaseContext.Provider>
  </Provider>,
  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
