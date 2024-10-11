import './App.css';
import React, { useState } from 'react';
// import Login from './Login'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from './Landing'
import Home from './Component/Home';
import Dashboard from './Component/Dashboard';
import Details from './Component/Details';
import Profile from './Component/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import StartPage from './StartPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/Landing/Dashboard" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        /> */}
        <Route path="/" element={<StartPage />} />
        <Route path="/Landing" element={<Landing />}>
          <Route path="Dashboard" element={<Dashboard />}>
            <Route path="Profile" element={<Profile />} />
          </Route>
          <Route path="Home" element={<Home />} />
          <Route path="Details" element={<Details />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
