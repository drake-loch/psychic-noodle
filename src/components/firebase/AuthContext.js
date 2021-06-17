import React, {useContext, useState, useEffect} from 'react'
import {auth} from './firebase'

const AuthContext = React.createContext();

export function useAuth(){
    return useContext;
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState();

    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email,password);
    }
    function signin(){

    }

    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        })
        return unsubscribe;
    }, [])

    const value = {
        currentUser,
        signup,
        signin,
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}