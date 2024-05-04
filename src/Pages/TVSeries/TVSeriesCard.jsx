import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setcontent } from "../../Redux/Slices/detailSlice";
import axios from "axios";
import { BASE_URL } from "../../BaseURL/basurl";

export const TVSeriesCard = ({ TVSeriescontent, imageUrl, title, TVseriesId, isauth }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const bookmarkCheck = useSelector((state) => state.detail.seriesbookmarkdata);
    const [isbookmarked, setIsbookmarked] = useState(false);


    useEffect(() => {
        // Function to check if the TV series is bookmarked
        const checkBookmarkStatus = (id) => {
            if (id && bookmarkCheck.includes(id)) {
                setIsbookmarked(true);
            } else {
                setIsbookmarked(false);
            }
        };

        // Check bookmark status if user is authenticated
        if (isauth) {
            checkBookmarkStatus(TVseriesId);
        }
    }, [TVseriesId, bookmarkCheck, isauth]);

    //function to add TV Series to bookmark
    const addtobookmark = async (id) => {
        
        try {
            const token = localStorage.getItem("jwtToken");
            const { data } = await axios.post(`${BASE_URL}/api/v1/data/bookmark/add`, { tvId: id },{
                headers:{
                   Authorization:`Bearer ${token}`,
                }
              });
            console.log(data);
            if (data.success) {
                setIsbookmarked(true);
                toast.success("series bookmarked..");
            } else {
                navigate("/login");
                toast.error("login required");
            }
        } catch (error) {
            console.log(error);
        }
    };

    //function to remove tv series from bookmark
    const removebookmark = async (id) => {
        const token = localStorage.getItem("jwtToken");
        try {
            const { data } = await axios.delete(`${BASE_URL}/api/v1/data/bookmark/remove/${id}`,{
                headers:{
                   Authorization:`Bearer ${token}`,
                }
              });
            if (data.success) {
                toast.success("series unbookmarked..");
                setIsbookmarked(false);
            } else {
                navigate("/login");
                toast.error("login required");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const isPlay = () => {
        dispatch(setcontent(TVSeriescontent));
        navigate("/detail");
    };

    return (
        <div className="movie-card relative overflow-hidden group">

            <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover"
             />

            {/* Bookmark button */}
            <div className="absolute top-0 right-0 p-2 z-10">
            <button type="button" onClick={() => isbookmarked ? removebookmark(TVseriesId) : addtobookmark(TVseriesId)}>
                    <FontAwesomeIcon icon={faBookmark} className={isbookmarked ? "text-yellow-500" : "text-white"} />
                </button>
            </div>
                
           
            <div className="play-text absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                {/*play button*/}
                <button onClick={isPlay} className="bg-black text-white px-4 py-2 rounded-full">
                    Play
                </button>
                {/* tv series type */}
                <div className="absolute top-0 left-0 bg-black bg-opacity-75 w-full py-2 px-4 ">
                    <p className="text-white text-sm truncate">{TVSeriescontent.type}</p>
                </div>
                {/* tv series title */}
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-75 w-full py-2 px-4 ">
                    <p className="text-white text-sm truncate">{title}</p>
                </div>
            </div>
        </div>
    )
}