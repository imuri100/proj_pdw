import "./App.css";
import React from "react";
import RegisterForm from "./containers/RegisterForm";
import RetrieveForm from "./containers/RetrieveForm ";
import ResetForm from "./containers/ResetForm";
import LoginForm from "./containers/LoginForm";
import {
  // BrowserRouter as Router,
  // withRouter,
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from "./containers/Dashboard";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/registo" element={<RegisterForm />} />
        <Route path="/recuperacao" element={<RetrieveForm />} />
        <Route path="/reset" element={<ResetForm />} />)
      </Routes>
    </div>
  );
}

export default App;
