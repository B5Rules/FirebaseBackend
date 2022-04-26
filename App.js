import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Login from './Pages/login'
import SignUp from './Pages/signup'

export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/sign-in" element={<Login/>} />
        <Route path="/sign-up" element={<SignUp/>} />
      </Routes>
    </Router>
  );

}