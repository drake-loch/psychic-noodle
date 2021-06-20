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
            day: this.now.getDate(),
            month: this.now.getMonth(),
            year: this.now.getFullYear(),
            time: this.now.getTime(),
        };
        this.body = body;
    }
}


function PostBrowser() {

    const {createPost, getAllPosts, currentUser} = useAuth();
    const [postList, setPostList] = useState([]);
    const [renderList, setRenderList] = useState(false);

    //=============temp=============
    let tempLorem = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus sapiente facilis eveniet neque. Nihil voluptates nam id dolore voluptatibus blanditiis et quibusdam, delectus, necessitatibus, dolorum nostrum fugit consequuntur officiis autem.";
    let tempData = new PostData("A title","drake loch",tempLorem);
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
        toRender.forEach(post => toReturn.push(<PostCard title={post.data.title} name={post.data.name} timestamp={post.data.timestamp} body={post.data.body} />));
        // toReturn = <PostCard />
        return toReturn;
    }

    const addPost = () => {
        createPost(tempData);
    }
    return (
        <div className="w-screen min-h-screen pb-5 bg-gray-400">
            <Navbar />
            {currentUser ? <button onClick={e => addPost()} className="px-3 py-2 bg-green-500 border border-green-700 ml-5 mt-5">Create Post +</button> : null}
            <section className="px-2 w-screen pt-5">
                {renderList ? renderPostCards(postList) : null}
            </section>
        </div>
    )
}

export default PostBrowser


export function PostCard({title,name,timestamp,body}) {

    function timeConverter(){
        return `${timestamp.month}/${timestamp.day}/${timestamp.year}`;
    }
    return (
        <div className="bg-gray-300 w-full min-h-1/2 mb-2 flex flex-wrap px-5 pt-5 pb-10 shadow-md" style={{fontFamily:'OpenSans'}}>
            <h4 className="w-full text-center font-bold" style={{fontFamily:'TitilliumWeb', fontSize:'1.75rem'}}>{title}</h4>
            <div className="w-full flex">
                <p className="w-1/2 py-2">By: {name}</p>
                <p className="w-1/2 py-2 text-right">Posted: {timeConverter()}</p>
            </div>
            <p className="w-full border-t border-b py-2">{body}</p>
            <p className="w-full text-right text-purple-600">Expore Further...</p>
        </div>
    )
}


