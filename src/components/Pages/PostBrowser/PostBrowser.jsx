import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../firebase/AuthContext'
import Navbar from '../../Navbar/Navbar'

//a page that loads cards containing posts from database
function PostBrowser() {

    const {getAllPosts, currentUser} = useAuth();
    const [postList, setPostList] = useState([]);
    const [renderList, setRenderList] = useState(false);

    const history = useHistory();


    useEffect(() => {
        postCardLoader();
    }, [])

    useEffect(() => {
        if(postList !== null){
            setRenderList(true);
        }
    }, [postList])

    //get post data from db and load it into cards organized by date. (filter in a later sprint)
    async function postCardLoader(){
        await getAllPosts(setPostList);
    }

    //collects posts and populates Post Card components with post data
    const renderPostCards = (toRender) => {
        let toReturn = [];
        toRender.forEach(post => toReturn.push(<PostCard key={post.data.id} title={post.data.title} name={post.data.name} timestamp={post.data.timestamp} body={post.data.body} postID={post.data.id} />));
        return toReturn;
    }

    return (
        <div className="w-screen min-h-screen pb-5 bg-gray-400">
            <Navbar />
            {currentUser ? <button onClick={e => history.push('/create-post')} className="px-3 py-2 bg-green-500 border border-green-700 ml-5 mt-5">Create Post +</button> : null}
            <section className="px-6 lg:px-80 w-screen pt-5">
                {renderList ? renderPostCards(postList) : null}
            </section>
        </div>
    )
}

export default PostBrowser

//a component specific to this page to be rendered
export function PostCard({title,name,timestamp,body, postID}) {

    const history = useHistory();

    const smallBody = body.substr(0,250);

    //converts timestamp into a string in the stil of [Month/Day,Year] and returns it
    function timeConverter(){
        return `${timestamp.month}/${timestamp.day}/${timestamp.year}`;
    }

    return (
        <div className="bg-gray-300 w-full min-h-1/2 max-h-50 mb-5 flex flex-wrap px-5 pt-5 pb-5 shadow-lg" style={{fontFamily:'OpenSans'}}>
            <h4 className="w-full text-center font-bold" style={{fontFamily:'TitilliumWeb', fontSize:'1.75rem'}}>{title}</h4>
            <div className="w-full flex">
                <p className="w-1/2 py-2">By: {name}</p>
                <p className="w-1/2 py-2 text-right">Posted: {timeConverter()}</p>
            </div>
            <div className="w-full border-t border-b py-2"><ReactMarkdown>
                {`${smallBody}...`}
                </ReactMarkdown></div>
            <p className="w-full text-right text-purple-600 py-2" onClick={e => history.push(`/post/${postID}`)}>Expore Further{" >"}</p>
        </div>
    )
}


