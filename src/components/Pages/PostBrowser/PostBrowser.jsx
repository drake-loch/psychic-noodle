import React from 'react'
import { useAuth } from '../../firebase/AuthContext'
import Navbar from '../../Navbar/Navbar'


//DELETE ME I AM FOR TESTINGS
class PostData {
    constructor(title,name,timestamp,body){
        this.title = title;
        this.name = name;
        this.timestamp = timestamp;
        this.body = body;
    }
}


function PostBrowser() {

    const {createPost, getAllPosts} = useAuth();

    //=============temp=============
    let tempData = new PostData("A title","drake loch",'12/12/2021',"Twas two weeks before christmas");
    //==============================

    //get post data from db and load it into cards organized by date. (filter in a later sprint)
    const postCardLoader = () => {
        console.log("pressed");
        createPost(tempData);
    }
    return (
        <div className="w-screen h-screen bg-gray-400">
            <Navbar />
            <button onClick={getAllPosts}>temp button</button>
            <section className="px-2 w-screen pt-10">
                <PostCard />
            </section>
        </div>
    )
}

export default PostBrowser


export function PostCard() {
    return (
        <div className="w-full h-20 bg-red-500">
            <p>hello there!</p>
        </div>
    )
}


