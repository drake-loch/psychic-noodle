import React, { useEffect, useState } from 'react'
import { useAuth } from '../../firebase/AuthContext';
import Navbar from '../../Navbar/Navbar'

function Post(props) {

    const {getPost} = useAuth();
    const [postID, setPostID] = useState(props.match.params.id);
    const [postInfo, setPostInfo] = useState(null);

    useEffect(() => {
        getPost(postID,setPostInfo);
    }, []);

    useEffect(() => {
        if(postInfo){
            console.log("info:");
            console.log(postInfo);
        }
    }, [postInfo]);

    function timeConverter(timestamp){
        return `${timestamp.month}/${timestamp.day}/${timestamp.year}`;
    }

    return (
        <div className="w-screen min-h-screen bg-gray-500">
            <Navbar />
            <div className="px-5 pb-5 mt-5 w-full h-full ">
                {(postInfo) ?
                <div className="bg-gray-400 px-5 pb-5 pt-2 rounded-xl" style={{minHeight:'80vh',fontFamily:'OpenSans',}}>
                    <p className="w-full text-center font-bold" style={{fontSize:'2rem', fontFamily:'TitilliumWeb'}}>{postInfo.data.title}</p>
                    <div className="w-full flex flex-wrap">
                        <p className="w-1/2 text-md">by: {postInfo.data.name}</p>
                        <p className="w-1/2 text-md text-right">posted: {timeConverter(postInfo.data.timestamp)}</p>
                    </div>
                    <p className="pt-5">{postInfo.data.body}</p>
                </div>
                :
                null
                }
            </div>
        </div>
    )
}

export default Post