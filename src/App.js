import logo from './logo.svg';
import './App.css';

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';

import { AuthContextProvider } from './context/AuthContext';
import Login from './pages/Login';
import Account from './pages/Account';

const App = () => {
  return (
    <div>
      <AuthContextProvider>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
      </Routes>
      </AuthContextProvider>
    </div>
  );
};

export default App;
