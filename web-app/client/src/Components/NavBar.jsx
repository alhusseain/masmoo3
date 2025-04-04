import React from "react";
import "./Assets/css/tailwind.css"
import profile from "./Assets/images/profile.png"
import download from "./Assets/images/download-arrow.png"
import options from "./Assets/images/Options.png"
import Searchkit from "./Assets/NavComp/SearchKit";
import PlayBack from "./Assets/NavComp/PlayBack";
import masmoo3 from "./Assets/images/masmoo3.png";
const NavBar = () => {
    return(
    <div>
        <div className="flex justify-between items-center bg-gray-50 shadow-sm p-4 ps-10 space-x-3">
            <div className="shrink-0"><a href="/home"><img src={masmoo3} className="size-8"/></a></div>
            <Searchkit/>
            <div className="flex justify-center items-center space-x-4">
                <PlayBack/>
                <div className="flex justify-between items-center space-x-5 pe-10 shrink-0">
                    <a href="/login"><img src={download} className="size-5"/></a>
                    <a href="/home"><img  src={profile} className="size-5"/></a>
                    <a href="/signup"><img  src={options} className="size-5"/></a>
                </div>
            </div>
        </div>
    </div>
    )
};

export default NavBar;