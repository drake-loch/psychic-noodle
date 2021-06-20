import React from 'react'
import Navbar from '../../Navbar/Navbar'

//landing page, nothing special
function Landing() {
    return (
        <div className="bg-gray-300 h-screen relative">
            <Navbar />
            <h1 className="font-bold relitive text-5xl text-center mt-36" style={{fontFamily:'TitilliumWeb'}}>
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
