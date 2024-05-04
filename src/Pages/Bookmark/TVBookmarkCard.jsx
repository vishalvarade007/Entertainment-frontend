import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookmark} from "@fortawesome/free-solid-svg-icons";
import {useDispatch} from "react-redux";
import {setcontent} from "../../Redux/Slices/detailSlice";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import {BASE_URL} from "../../BaseURL/basurl";

export const TVBookmarkCard = ({series,removeBookmarkCard})=>{
       const dispatch = useDispatch();
       const navigate = useNavigate();

       //function to remove bookmark
       const removeBookmark = async(id)=>{
           try{
            const token = localStorage.getItem("jwtToken");
            const {data} = await axios.delete(`${BASE_URL}/api/v1/data/bookmark/remove/${id}`,{
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            });
            if(data.success){
               toast.success("unbookmark");
               removeBookmarkCard(id);
            }
           }catch(error){
              console.log(error);
              toast.error("already unbookmark..");
           }
       };

       //function to handle play button click
       const isPlay = ()=>{
          dispatch(setcontent(series));
          navigate("/detail");
       };

       return (
         <div className="series-card relative overflow-hidden group">
            <img src={series.big_image} alt={series.title} className="w-full h-full object-cover"/>
            {/* Remove bookmark button */}
            <button onClick={()=>removeBookmark(series._id)} className="bookmark-icon absolute top-0 right-0 p-2 z-10">
                <FontAwesomeIcon icon={faBookmark} className="text-yellow-500"/>
            </button>
            <div className="play-text absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                {/* Play button */}
                <button className="bg-black text-white px-4 py-2 rounded-full" onClick={isPlay}>Play</button>
                {/* series type */}
                <div className="absolute top-0 left-0 bg-black bg-opacity-75 w-full px-4 py-2">
                    <p className="text-white text-sm truncate">{series.type}</p>
                </div>
                {/* series title */}
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-75 w-full px-4 py-2">
                    <p className="text-white text-sm truncate">{series.title}</p>
                </div>
            </div>
         </div>
       )
}