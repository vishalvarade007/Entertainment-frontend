import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setcontent } from "../../../Redux/Slices/detailSlice";
import axios from "axios";
import { BASE_URL } from "../../../BaseURL/basurl";

export const RecommendMovieCard = ({ movie, isauth }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const bookmarkCheck = useSelector(state => state.detail.moviebookmarkdata);

    const [isbookmarked, setIsbookmarked] = useState(false);

    useEffect(() => {
        //function to check whether movie is bookmarked or not
        const checkBookmarkStatus = (id) => {
            if (id && bookmarkCheck.includes(id)) {
                setIsbookmarked(true);
            } else {
                setIsbookmarked(false)
            }
        };
        if (isauth) {
            checkBookmarkStatus(movie._id);
        }
    }, [movie._id, isauth, bookmarkCheck]);

    //function to add movie to bookmark
    const addtobookmark = async (id) => {
        try {
            const { data } = await axios.post(`${BASE_URL}/api/v1/data/bookmark/add`, { movieId: id });
            if (data.success) {
                setIsbookmarked(true);
                toast.success("movie bookmarked");
            } else {
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
        }
    };

    //function to remove movie from bookmark
    const removebookmark = async (id) => {
        try {
            const { data } = await axios.delete(`${BASE_URL}/api/v1/data/bookmark/remove/${id}`);
            if (data.success) {
                setIsbookmarked(false);
                toast.success("movie unbookmarked");
            } else {
                navigate("/login");
            }
        }catch(error){
            console.log(error);
        }
     };

     //function to handle clicking on play button
     const isPlay = ()=>{
        dispatch(setcontent(movie));
        navigate("/detail");
     };

     return (
        <div className="movie-card relative overflow-hidden group">
           {/* Movie-image */}
           <img src={movie.big_image} alt={movie.title} className="w-full h-auto object-cover"/>
           {/* bookmark-icon */}
           <button onClick={()=>isbookmarked ? removebookmark(movie._id):addtobookmark(movie._id)} className="bookmark-icon absolute top-0 right-0 p-2 z-10">
            <FontAwesomeIcon icon={faBookmark} className={`${isbookmarked?"text-yellow-500":"text-white"}`}/>
           </button>
           <div className="play-text absolute inset-0 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              {/* Play button */}
              <button onClick={isPlay} className="bg-black text-white px-4 py-2 rounded-full">Play</button>
              {/* Movie-Type */}
              <div className="absolute top-0 left-0 bg-black bg-opacity-75 w-full px-4 py-2">
                <p className="text-white text-sm truncate">{movie.type}</p>
              </div>
              {/* Movie-Title */}
              <div className="absolute bottom-0 left-0 bg-black bg-opacity-75 w-full px-4 py-2">
                <p className="text-white text-sm truncate">{movie.title}</p>
              </div>
           </div>
        </div>
     )
}