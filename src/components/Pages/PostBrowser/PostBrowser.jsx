import React from 'react'
import Navbar from '../../Navbar/Navbar'

function PostBrowser() {
    return (
        <div className="w-screen h-screen bg-gray-400">
            <Navbar />
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


