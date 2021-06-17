import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import dragonImg from '../../assets/pictures/dragon.png'

function Navbar() {
    const [toggleMod, setToggleMod] = useState(false);
    const location = useLocation();
    const history = useHistory();
    useEffect(() => {
        console.log(`Location is: ${location.pathname}`);
    }, []);

    const hamburgToggle = () => {
        console.log("clicked!");
        setToggleMod(!toggleMod);
    }
    return (
        <nav className="relitive w-screen, h-auto bg-gray-400 flex justify-between px-5 py-3">
            {toggleMod ? <ModWindow modToggle={hamburgToggle} /> : null}
            <img className="w-16 h-16 cursor-pointer" src={dragonImg} alt="A logo" />
            <div style={{fontFamily:'TitilliumWeb'}} className="flex items-center w-2/3 text-xl">
                <p className="pb-2 mr-4" onClick={e => history.push('/')}>Home</p>
                <p className="pb-2" onClick={e => history.push('/post-browser')}>Blog</p>
            </div>
            <div className="flex flex-col justify-center w-8 cursor-pointer" onClick={hamburgToggle}>
                <div className="w-full h-1 bg-black"></div>
                <div className="w-full h-1 bg-none"></div>
                <div className="w-full h-1 bg-black"></div>
                <div className="w-full h-1 bg-none"></div>
                <div className="w-full h-1 bg-black"></div>
            </div>
        </nav>
    )
}

export default Navbar

export function ModWindow({modToggle}) {

    const blogBttn = () => {
        console.log("pressed");
    }
    const loginBttn = () => {
        console.log("pressed");
    }
    return (
        <div className="absolute w-screen h-screen bg-black bg-opacity-50 left-0 top-0 flex flex-row-reverse">
            <div className="relitive w-2/3 h-full bg-gray-300 flex flex-col-reverse">
                <button className="absolute top-0 right-0 p-4 bg-red-500" onClick={modToggle}>X</button>
                <button style={{fontFamily:'OpenSans'}} onClick={e => loginBttn()} className="w-full mb-1 bg-green-600 h-12 flex justify-center items-center">
                    <h3 className="text-4x1">Login</h3>
                </button>
                <button style={{fontFamily:'OpenSans'}} onClick={e => blogBttn()} className="w-full bg-green-600 mb-2 h-12 flex justify-center items-center">
                    <h3 className="text-6x1">Blog</h3>
                </button>

            </div>
        </div>
    )
}


