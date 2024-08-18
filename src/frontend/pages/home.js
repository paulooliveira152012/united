import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Home Page</h1>
            <button onClick={() => navigate('/profile')}>Ir para perfil</button>
            <button onClick={() => navigate('/signin')}>Ir para login</button>
            <button onClick={() => navigate('/signup')}>Ir para signup</button>
        </div>
    );
};

export default Home;

