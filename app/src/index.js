import React from 'react';
import ReactDOM from 'react-dom/client';

import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";

import './index.css';
import HomePage from './HomePage.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<HomePage />} />
        </Routes>
    </BrowserRouter>
);

