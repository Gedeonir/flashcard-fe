import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import App from './App';
import Signup from './Signup';
import Update from './updateQuestion';


const routes = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/create-user" element={<Signup />} />
      <Route path="/updatequestion" element={<Update />} />
      <Route path="/" element={<App />} />
    </Routes>
  </Router>
);

export default routes;