import React, {useContext, useState, useEffect} from 'react'
import {auth,db} from './firebase'

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

//=====================================
class PostData {
    constructor(title,name,timestamp,body){
        this.title = title;
        this.name = name;
        this.timestamp = timestamp;
        this.body = body;
    }
}
//=====================================

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState();

    //sign up function, takes email and password
    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email,password);
    }
    //signin sunction, takes email and password
    function signin(email, password){
        return auth.signInWithEmailAndPassword(email,password);
    }

    //create a post takes in data, formats it and uploads to database
    function createPost(data){
        console.log("creating post");
        let postData = new PostData(data.title,data.name,data.timestamp,data.body);
        console.log(postData);
    }

    //gets all post data from db and returns them in a array
    function getAllPosts(){
        db.ref(`/posts`).once('value')
        .then((snapshot) => {
            console.log(snapshot.val());
        })

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
        createPost,
        getAllPosts,
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
