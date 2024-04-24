import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookmark} from "@fortawesome/free-solid-svg-icons";
import {useDispatch} from "react-redux";
import {setcontent} from "../../Redux/Slices/detailSlice";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import {BASE_URL} from "../../BaseURL/basurl";

export const MovieBookmarkCard = ({movie,removeBookmarkCard})=>{
       const dispatch = useDispatch();
       const navigate = useNavigate();

       //function to remove bookmark
       const removeBookmark = async(id)=>{
           try{
            const {data} = await axios.delete(`${BASE_URL}/api/v1/data/bookmark/remove/${id}`);
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
          dispatch(setcontent(movie));
          navigate("/detail");
       };

       return (
         <div className="movie-card relative overflow-hidden group">
            <img src={movie.big_image} alt={movie.title} className="w-full h-full object-cover"/>
            {/* Remove bookmark button */}
            <button onClick={()=>removeBookmark(movie._id)} className="bookmark-icon absolute top-0 right-0 p-2 z-10">
                <FontAwesomeIcon icon={faBookmark} className="text-yellow-500"/>
            </button>
            <div className="play-text absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                {/* Play button */}
                <button className="bg-black text-white px-4 py-2 rounded-full" onClick={isPlay}>Play</button>
                {/* Movie type */}
                <div className="absolute top-0 left-0 bg-black bg-opacity-75 w-full px-4 py-2">
                    <p className="text-white text-sm truncate">{movie.type}</p>
                </div>
                {/* Movie title */}
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-75 w-full px-4 py-2">
                    <p className="text-white text-sm truncate">{movie.title}</p>
                </div>
            </div>
         </div>
       )
}