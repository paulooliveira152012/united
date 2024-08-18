import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext';


const Profile = () => {
    const navigate = useNavigate();
    const { user, logoutUser } = useUser();

    if (!user) {
        return <div>Please log in</div>
    } 

    return (
        <div>
            <h1>Welcome, {user.username}</h1>
            <button onClick={() => navigate('/')}>Back home</button>
            <button onClick={logoutUser}>Logout</button>
        </div>
    );
};

export default Profile;
