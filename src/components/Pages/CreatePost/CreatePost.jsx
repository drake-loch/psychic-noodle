import React from 'react'
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../firebase/AuthContext';
import Navbar from '../../Navbar/Navbar'

//the base post data structure. Needs a title, name and body. Creates timestamp on creation
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

//a page to create a page. Posts can only be made by me. Because its my blog lol
function CreatePost() {

    const {currentUser, createPost} = useAuth();
    const history = useHistory();

    //gets info to be subbmited to post list and pushes location to /post-browser
    const submitHandler = (e) => {
        e.preventDefault();
        const title = e.target.form[1].value;
        const body = e.target.form[2].value;
        let newPost = new PostData(title,"Drake Loch",body);
        createPost(newPost);
        history.push(`/post-browser`);
    }
    return (
        <div className="w-screen h-screen overflow-y-hidden">
            <Navbar />
            <div className="bg-gray-400 w-full h-full px-5 py-5">
                <div className="w-full flex justify-between mb-5">
                    <button onClick={e => history.goBack()} className=" border border-black px-5 py-2">{"< return"}</button>
                    <button form="createPost" onClick={e => submitHandler(e)} type="submit" className="bg-green-400 px-8 py-2">Post</button>
                </div>
                <form onSubmit={e => null} className="w-full bg-gray-300 px-5 pt-3" style={{minHeight:'75vh'}} id="createPost">
                    <div className="flex flex-wrap justify-center mb-5">
                        <label htmlFor="title" className="w-full text-center" style={{fontSize:'1.75rem'}}>Post Title:</label>
                        <input type="text" name="title" id="title" className="w-full h-10 border rounded-lg px-2 border-black" placeholder="Post title...." />
                    </div>
                    <div className="flex flex-wrap justify-center mb-5">
                        <label htmlFor="title" className="w-full text-center" style={{fontSize:'1.75rem'}}>Content:</label>
                        <textarea type="text" name="body" id="body" className="w-full border rounded-lg p-2 border-black" style={{minHeight:'20rem'}} placeholder="Post title...." />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreatePost
