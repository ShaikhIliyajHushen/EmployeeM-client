import './App.css';
import React, { useState } from 'react';
import Login from './Login'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from './Layout'
import Home from './Component/Home';
import Dashboard from './Component/Dashboard';
import Details from './Component/Details';
import Setting from './Component/Setting';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  // const [isLoggedIn, setLoggedIn] = useState(false);
  // const handleLogin = () => {
  //   setLoggedIn(true);
  // };

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/Layout/Dashboard" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        /> */}
        <Route path="/Layout" element={<Layout />}>
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="Home" element={<Home />} />
          <Route path="Details" element={<Details />} />
          <Route path="Setting" element={<Setting />} />
        </Route>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
