import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import App from './App';

const routes = () => (
  <Router>
    <Routes>
      <Route path="/useraccounts" element={<Login />} />
      <Route path="/" element={<App />} />
      {/* <Route path="/dashboard" element={<Dashboard />} >
         <Route path='create' element={<CreateFlashcard />} />
         <Route path='viewCards' element={<FlashcardList />} />
      </Route> */}
    </Routes>
  </Router>
);

export default routes;