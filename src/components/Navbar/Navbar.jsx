import React from 'react'
import dragonImg from '../../assets/pictures/dragon.png'

function Navbar() {

    const hamburgToggle = () => {
        console.log("clicked!");
    }
    return (
        <div className="w-screen, h-auto bg-gray-400 flex justify-between px-5 py-3" onClick={hamburgToggle}>
            <img className="w-16 h-16 cursor-pointer" src={dragonImg} alt="A logo" />
            {/* <h3>Blog</h3> */}
            <div className="flex flex-col justify-center w-8 cursor-pointer">
                <div className="w-full h-1 bg-black"></div>
                <div className="w-full h-1 bg-none"></div>
                <div className="w-full h-1 bg-black"></div>
                <div className="w-full h-1 bg-none"></div>
                <div className="w-full h-1 bg-black"></div>
            </div>
        </div>
    )
}

export default Navbar
