import React from "react";
import {Link,useLocation,useNavigate} from "react-router-dom";
import {AiFillAppstore} from "react-icons/ai";
import {HiBookmark} from "react-icons/hi2";
import {MdLocalMovies,MdMovie} from "react-icons/md";
import {TbDeviceTvOld} from "react-icons/tb";
import toast from "react-hot-toast";
import axios from "axios";
import logout from "../Images/logout.png";

export const Navbar = ()=>{
    //get the current path location
    const {pathname} = useLocation();
    const navigate = useNavigate();

    //function to handle user logout
    const handleLogout = async()=>{
        const {data} = await axios.get("http://localhost:8080/api/v1/user/logout");
        if(data.success){
            navigate("/");
            window.location.reload();
            toast.success(data.message);
        }
        else{
            navigate("/login");
        }
    }
    const book = (pathname === "/bookmark"?"text-red-600":"text-white");
    const tv = (pathname === "/tvseries"?"text-red-600":"text-white");
    const movie = (pathname === "/movie"?"text-red-600":"text-white");
    const root = (pathname === "/"?"text-red-600":"text-white");
    return (
        <div>
            <nav className="bg-gray-800 p-4 flex justify-between items-center">
                <MdMovie className="text-red-500 text-4xl md:text-3xl"/>
                <div className="text-2xl flex px-4 space-x-16 md:space-x-8 sm:space-x-4">
                   <Link to="/"><AiFillAppstore className={`hover:text-white ${root}`}/></Link>
                   <Link to="/movies"><MdLocalMovies className={`hover:text-white ${movie}`}/></Link>
                   <Link to="/tvseries"><TbDeviceTvOld className={`hover:text-white ${tv}`}/></Link>
                   <Link to="/bookmark"><HiBookmark className={`hover:text-white ${book}`}/></Link>
                </div>
                <button type="button" onClick={handleLogout} className="relative flex bg-gray-800 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"  id="user-menu-button" aria-expanded="false" aria-haspopup="true"> 
                   <span className="absoulte -inset-1.5"></span>
                   <span className="sr-only">Open user menu</span>
                   <img className="h-8 w-8" src={logout} alt="logout img"/>
                </button>
            </nav>
        </div>
    )
}