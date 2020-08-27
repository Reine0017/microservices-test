import React from "react";
import "./App.css";
import { Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import AboutPage from "./pages/AboutPage/AboutPage";

function App() {
  return (
    <div className="App">
      <span>HELLO WORLD</span>
      <Route exact path="/AboutPage" component={AboutPage} />
      <Route exact path="/" component={HomePage} />
    </div>
  );
}

export default App;
