import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sugnup = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Signup</h1>
            <button onClick={() => navigate('/')}>Back home</button>
        </div>
    );
};

export default Sugnup;
