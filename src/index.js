import React from 'react';
import {
    BrowserRouter as Router,
    Route, Routes,
} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './index.css';
import Voter from './Pages/Voter';
import Dashboard from './Pages/Dashboard';
import reportWebVitals from './reportWebVitals';
import TimeOver from "./Pages/TimeOver";
import Create from "./Pages/Create";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <Routes>
            <Route path="/" element={<Voter />} />
            {/*<Route path="/" element={<TimeOver />} />*/}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create" element={<Create />} />
        </Routes>
    </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
