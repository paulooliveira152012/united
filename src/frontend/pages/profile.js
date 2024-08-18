import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext';

const Profile = () => {
    const navigate = useNavigate();
    const { user, logoutUser } = useUser(); // Destructure logoutUser from useUser

    const handleLogout = async () => {
        console.log("attempting logout");
        try {
            const response = await fetch('http://localhost:5010/api/signout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log('Logout request successful');
                logoutUser(); // Call logoutUser to clear the user context and localStorage
                navigate('/'); // Redirect to the home page or login page after logout
            } else {
                console.error('Failed to log out:', await response.text());
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    if (!user) {
        return (
            <div>
        <p>Please login</p>
        <button onClick={() => navigate('/')}>Back home</button>
        <button onClick={() => navigate('/signin')}>Login</button>
        </ div>
    )
        
    } 

    return (
        <div>
            <h1>Welcome, {user.username}</h1>
            <button onClick={() => navigate('/')}>Back home</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Profile;
