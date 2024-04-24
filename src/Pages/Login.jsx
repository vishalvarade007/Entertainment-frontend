import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../BaseURL/basurl";
import toast from "react-hot-toast";

export const Login = () => {
    const navigate = useNavigate();

    //state variables for emai,password and password visibility
    const [email, setEmail] = useState("");
    const [showPassword, setshowPassword] = useState(false);
    const [password, setPassword] = useState("");

    //function for login validation
    const loginValidation = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${BASE_URL}/api/v1/user/login`, { email: email, password: password });
            if (data.success) {
                toast.success("login successfull..");
                navigate("/");
            } else {
                toast.error("invalid email or password");
            }
        }catch(error){
            toast.error(error.response.data);
            console.log(error);
        }
    };

    //function to toggle password visiblity
    const togglePassword = ()=>{
        setshowPassword(!showPassword);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen"> 
            <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
               <h2 className="text-2xl mb-4">Login</h2>
               <form onSubmit={loginValidation} className="w-full">
                 <div className="mb-4">
                   <label htmlFor="email" className="block mb-2">Email:</label>
                   <input type="email" id="email" onChange={(e)=>setEmail(e.target.value)} className="w-full px-3 py-2 border rounded-lg"/>
                 </div>
                 <div className="mb-4">
                    <label htmlFor="password" className="block mb-2">Password:</label>
                    <div className="relative">
                        <input type={showPassword ? "text" : "password"} onChange={(e)=>setPassword(e.target.value)} id="password" className="w-full px-3 py-2 border rounded-lg"/>
                        <button type="button" onClick={togglePassword} className="absolute right-0 top-0 mr-2 mt-3">
                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash}/>
                        </button>
                    </div>
                 </div>
                 <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg">Login</button>
               </form>
               <div className="mt-4">
                 <p>Don't have an account ? <Link to="/register" className="text-blue-500">Create your account</Link></p>
               </div>
            </div>
        </div>
    )
}