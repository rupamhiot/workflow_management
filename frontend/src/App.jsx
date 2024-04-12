import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/home/home"
import Execution from "./component/execution/excution"
const App = () => {
  return (
    <Router>
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/execution" Component={Execution} />
        </Routes>
    </Router>
  );
};
export default App;