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
        <div>
            
        </div>
    )
}