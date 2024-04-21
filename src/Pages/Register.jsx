import React,{useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye,faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {BASE_URL} from "../BaseURL/basurl";
import {Link,useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

export const Register = ()=>{
    const navigate = useNavigate();

    //state variables for password visibility and form data
    const [showPassword,setshowPassword] = useState(false);
    const [showconfirmPassword,setshowconfirmPassword] = useState(false);
    const [formdata,setFormdata] = useState({
        email:"",
        password:"",
        confirmPassword:""
    }) ;

    //function to toggle password visibility
    const togglePassword = ()=>{
        setshowPassword(!showPassword);
    };
    
    //function to toggle confirm-password visibility
    const toggleConfirmPassword = ()=>{
        setshowconfirmPassword(!showconfirmPassword);
    };

    //function to handle input changes
    const handleInputChanges = (e)=>{
        const {name,value} = e.target;
        setFormdata((prevState)=>({
            ...prevState,
            [name]:value,
        }))
    };

    //function to handle form submission
    const handleFormSubmission = async(e)=>{
        e.preventDefault();
        const {confirmPassword,...userData} = formdata;
        if(formdata.password !== confirmPassword){
            toast.error("password do not match");
            return;
        }
        try{
            const {data} = await axios.post(`${BASE_URL}/api/v1/user/register`,userData);
            if(data.success){
                toast.success("registered successfully...");
                navigate("/login");
            }
        }catch(error){
            toast.error(error.response.data);
            console.log(error);
        }

    };
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
                 <h2 className="text-2xl mb-4">Sign Up</h2>
                 <form className="w-full" onSubmit={handleFormSubmission}>
                     <div className="mb-4">
                        <label htmlFor="email" className="block mb-2">Email:</label>
                        <input type="email" name="email" onChange={handleInputChanges} className="w-full px-3 py-2 border rounded-lg"/>
                     </div>
                     <div className="mb-4">
                         <label htmlFor="password" className="block mb-2">Password:</label>
                         <div className="relative">
                             <input onChange={handleInputChanges} name="password" type={showPassword ? "text" : "password"} className="w-full px-3 py-2 border rounded-lg"/>
                             <button type="button" onClick={togglePassword} className="absolute right-0 top-0 mr-2 mt-3">
                                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash}/>
                             </button>
                         </div>
                     </div>
                     <div className="mb-4">
                         <label htmlFor="confirmpassword" className="block mb-2">Confirm Password:</label>
                         <div className="relative">
                             <input onChange={handleInputChanges} name="password" type={showPassword ? "text" : "password"} className="w-full px-3 py-2 border rounded-lg"/>
                             <button type="button" onClick={toggleConfirmPassword} className="absolute right-0 top-0 mr-2 mt-3">
                                <FontAwesomeIcon icon={showconfirmPassword ? faEye : faEyeSlash}/>
                             </button>
                         </div>
                     </div>
                     <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg">Sign Up</button>
                 </form>
                 <div className="mt-4">
                    <p>Already have an account?<Link to="/login" className="text-blue-500">Login here</Link></p>

                 </div>
            </div>
        </div>
    )
}