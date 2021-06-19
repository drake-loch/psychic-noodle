import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import dragonImg from '../../assets/pictures/dragon.png'
import { useAuth } from '../firebase/AuthContext';

function Navbar() {
    const [toggleMod, setToggleMod] = useState(false);
    const [toggleLoginMod, setToggleLoginMod] = useState(false);
    const location = useLocation();
    const history = useHistory();
    useEffect(() => {
        console.log(`Location is: ${location.pathname}`);
    }, []);

    const hamburgToggle = () => {
        console.log("clicked!");
        setToggleMod(!toggleMod);
    }
    const loginModToggle = () => {
        console.log("clicked!");
        setToggleLoginMod(!toggleLoginMod);
    }

    return (
        <nav className="relitive w-screen, h-auto bg-gray-400 flex justify-between px-5 py-3">
            {toggleMod ? <ModWindow modToggle={hamburgToggle} loginToggle={loginModToggle} /> : null}
            {toggleLoginMod ? <LoginMod loginToggle={loginModToggle} /> : null}
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


//navigation mod window
export function ModWindow({modToggle,loginToggle}) {

    const blogBttn = () => {
        console.log("pressed");
    }
    const loginBttn = () => {
        console.log("pressed");
        modToggle();
        loginToggle();
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

//a login mod
export function LoginMod({loginToggle}) {

    const {signup, signin} = useAuth();

    const loginEvent = (e) => {
        e.preventDefault();
        console.log("logging in!");
        let email = e.target.form[0].value;
        let password = e.target.form[1].value;
        let message = signin(email,password);
        // console.log(message);
        loginToggle();
    }

    //disabling create account until implemted fully in a later sprint
    // const createAccount = (e) => {
    //     e.preventDefault();
    //     console.log("creating account!");
    //     // console.log(e.target.form[0].value);
    //     let email = e.target.form[0].value;
    //     let password = e.target.form[1].value;
    //     signup(email,password);
    // }

    return (
        <div className="absolute w-screen h-screen bg-black bg-opacity-50 left-0 top-0">
            <div className="w-3/4 h-3/4 bg-gray-300 mx-auto mt-20 flex items-center">
                <button className="absolute top-20 right-16 text-3xl" onClick={loginToggle}>X</button>
                <form action="submit" className="w-full h-1/2 px-2 flex flex-wrap justify-center items-center">
                    <div className="flex flex-wrap w-full p-5">
                        <label htmlFor="email" className="w-full text-xl">Email:</label>
                        <input type="email" name="email" id="email" className="w-full border-2 border-black py-1 px-1" placeholder="Email..." />
                    </div>
                    <div className="flex flex-wrap w-full p-5">
                        <label htmlFor="password" className="w-full text-xl">Password:</label>
                        <input type="password" name="password" id="password" className="w-full border-2 border-black py-1 px-1" placeholder="Password..." />
                    </div>
                    <button onClick={e => loginEvent(e)} name="login" type="submit" className="border-2 border-gray-500 py-2 px-5 bg-green-500">login</button>
                    <button onClick ={e => createAccount(e)} name="create" type="submit" className="w-full text-center text-purple-500 mt-2">create account</button>
                </form>
            </div>
        </div>
    )
}



