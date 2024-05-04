import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons"
import toast from "react-hot-toast";
import { setcontent } from "../../../Redux/Slices/detailSlice";
import axios from "axios";
import { BASE_URL } from "../../../BaseURL/basurl";

export const RecommendSeriesCard = ({ series, isauth }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const bookmarkcheck = useSelector(state => state.detail.seriesbookmarkdata);

    const [isbookmarked, setIsbookmarked] = useState(false);

    useEffect(() => {
        //function to check series is bookmarked or not
        const checkbookmarkStatus = (id) => {
            if (id && bookmarkcheck.includes(id)) {
                setIsbookmarked(true);
            } else {
                setIsbookmarked(false);
            }
        };

        if (isauth) {
            checkbookmarkStatus();
        }
    }, [series._id, isauth, bookmarkcheck]);

    //function to add series to bookmark
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
                toast.success("series bookmarked");
            } else {
                navigate("/login")
            }
        } catch (error) {
            console.log(error);
        }
    };

    //function to remove series from bookmark
    const removebookmark = async (id) => {
        try {
            const token = localStorage.getItem("jwtToken");
            const { data } = await axios.delete(`${BASE_URL}/api/v1/data/bookmark/remove/${id}`,{
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            });
            if (data.success) {
                setIsbookmarked(false);
                toast.success("series unbookmarked");
            } else {
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
        }
    };

    //function to handle play button
    const isPlay = () => {
        dispatch(setcontent(series));
        navigate("/detail");
    }

    return (
        <div className="movie-card relative overflow-hidden group">
            <img src={series.big_image} alt={series.title} className="w-full h-full object-cover" />
            <button onClick={() => isbookmarked ? removebookmark(series._id) : addtobookmark(series._id)} className="bookmark-icon absolute top-0 right-0 p-2 z-10">
                <FontAwesomeIcon icon={faBookmark} className={` ${isbookmarked ? 'text-yellow-500' : 'text-white'}`} />
            </button>
            <div className="play-text absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <button className="bg-black text-white px-4 py-2 rounded-full" onClick={isPlay}>Play</button>
                <div className="absolute top-0 left-0 bg-black bg-opacity-75 w-full py-2 px-4 ">
                    <p className="text-white text-sm truncate">{series.type}</p>
                </div>
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-75 w-full py-2 px-4 ">
                    <p className="text-white text-sm truncate">{series.title}</p>
                </div>
            </div>
        </div>
    )
}