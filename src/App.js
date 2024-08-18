import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './Home';
import Home from './frontend/pages/home';
import Profile from './frontend/pages/profile';
import Signup from './frontend/pages/signup';
import Login from './frontend/pages/login';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Login />} />
            </Routes>
        </Router>
    );
};

export default App;
