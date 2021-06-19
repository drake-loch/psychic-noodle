import React, { useEffect, useState } from 'react'
import { useAuth } from '../../firebase/AuthContext'
import Navbar from '../../Navbar/Navbar'


//DELETE ME I AM FOR TESTINGS
class PostData {
    constructor(title,name,body){
        this.title = title;
        this.name = name;
        this.now = new Date();
        this.timestamp = {
            day: this.now.getDay(),
            month: this.now.getMonth(),
            year: this.now.getFullYear(),
            time: this.now.getTime(),
        };
        this.body = body;
    }
}


function PostBrowser() {

    const {createPost, getAllPosts} = useAuth();
    const [postList, setPostList] = useState([]);
    const [renderList, setRenderList] = useState(false);

    //=============temp=============
    let tempData = new PostData("A title","drake loch","Twas two weeks before christmas");
    //==============================

    useEffect(() => {
        postCardLoader();
    }, [])

    useEffect(() => {
        if(postList !== null){
            console.log("list updated");
            console.log(postList);
            setRenderList(true);
        }
    }, [postList])

    //get post data from db and load it into cards organized by date. (filter in a later sprint)
    async function postCardLoader(){
        // const posts = await getAllPosts();
        await getAllPosts(setPostList);
    }

    const renderPostCards = (toRender) => {
        let toReturn = [];
        console.log("TO render:");
        console.log(toRender);
        toRender.forEach(post => toReturn.push(<PostCard />));
        // toReturn = <PostCard />
        return toReturn;
    }

    const addPost = () => {
        createPost(tempData);
    }
    return (
        <div className="w-screen h-screen bg-gray-400">
            <Navbar />
            <button onClick={e => addPost()}>temp button</button>
            <section className="px-2 w-screen pt-10">
                {renderList ? renderPostCards(postList) : null}
            </section>
        </div>
    )
}

export default PostBrowser


export function PostCard() {
    return (
        <div className="w-full h-20 bg-red-500 mb-2">
            <p>hello there!</p>
        </div>
    )
}


