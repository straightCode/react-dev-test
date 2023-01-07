import React from 'react';
import MainPage from "./modules/pages/mainPage/MainPage";
import { BrowserRouter as Router } from "react-router-dom";
import {Provider} from "react-redux";
import store from "./modules/store/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <MainPage/>
      </Router>
    </Provider>
  );
}

export default App;
