import React, { createContext, useState, useContext, useEffect } from "react";

// create the UserContext
export const UserContext = createContext();

// create the UserProvider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadUser = () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        };
        loadUser();
    }, []);

    const loginUser = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        console.log('UserContext: user is', user);
    };

    const logoutUser = async () => {
        try {
            const response = await fetch('http://localhost:5010/signout', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            });
        
            if (response.ok) {
              localStorage.removeItem('user');
              setUser(null);
            } else {
              console.error('Failed to log out');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const updateUser = (updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    return (
        <UserContext.Provider value={{ user, setUser, loginUser, logoutUser, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
