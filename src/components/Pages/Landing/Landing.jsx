import React from 'react'
import Navbar from '../../Navbar/Navbar'

function Landing() {
    return (
        <div className="bg-gray-300 h-screen relative">
            <Navbar />
            <h1 className="font-bold relitive text-4xl text-center mt-36">
                Welcome
                <br />
                to my
                <br />
                developer logs...
            </h1>
        </div>
    )
}

export default Landing
