import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Profile</h1>
            <button onClick={() => navigate('/')}>Back home</button>
        </div>
    );
};

export default Profile;
