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
        console.log(data);
        const postListRef = db.ref('/posts');
        const newPostRef = postListRef.push();
        data.id = newPostRef.key
        newPostRef.set({
            data
        });
    }

    //gets all post data from db and returns them in a array
    async function getAllPosts(setList){
        db.ref(`/posts`).once('value')
        .then((snapshot) => {
            let tempList = [];
            snapshot.forEach(item => {
                console.log(item);
                tempList.push(item.val())
            });
            setList(tempList);
        })
    }

    async function getPost(postID,toSet){
        db.ref(`/posts/${postID}`).once('value')
        .then((snapshot) => {
            // console.log(snapshot.val());
            toSet(snapshot.val());
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
        getPost,
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
