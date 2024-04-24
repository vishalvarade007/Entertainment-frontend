import React,{useEffect,useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBook, faBookmark} from "@fortawesome/free-solid-svg-icons";
import {useDispatch,useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {setcontent} from "../../Redux/Slices/detailSlice";
import axios from "axios";
import {BASE_URL} from "../../BaseURL/basurl";

export const TVSeriesCard = ({TVSeriescontent,imageUrl,title,TVseriesId,isauth})=>{
       const dispatch = useDispatch();
       const navigate = useNavigate();
       const bookmarkCheck = useSelector((state)=>state.detail.bookmarkseriesdata);
       const [isbookmarked,setIsbookmarked] = useState(false);
       const [imageLoadError,setImageLoadError] = useState(false);

       useEffect(() => {
        // Function to check if the TV series is bookmarked
        const checkBookmarkStatus = (id) => {
            if (id && bookmarkcheck.includes(id)) {
                setIsbookmarked(true);
            } else {
                setIsbookmarked(false);
            }
        };

        // Check bookmark status if user is authenticated
        if (isauth) {
            checkBookmarkStatus(TvseriesId);
        }
    }, [TVseriesId, bookmarkCheck, isauth]);

    //function to add TV Series to bookmark
    const addtobookmark = async(id)=>{
        try{
            const {data} = await axios.post(`${BASE_URL}/api/v1/data/bookmark/add`,{tvseriesId:id});
            if(id && bookmarkCheck.includes(id)){
                setIsbookmarked(true);
                toast.success("series bookmarked..");
            }else{
                navigate("/login");
                toast.error("login required");
            }
        }catch(error){
            console.log(error);
        }
    };

    //function to remove tv series from bookmark
    const removebookmark = async(id)=>{
        try{
            const {data} = await axios.delete(`${BASE_URL}/api/v1/data/bookmark/remove/${id}`);
            if(data.success){
                toast.success("series unbookmarked..");
                setIsbookmarked(false);
            }else{
                navigate("/login");
                toast.error("login required");
            }
        }catch(error){
            console.log(error);
        }
    };

    const isPlay = ()=>{
        dispatch(setcontent(TVSeriescontent));
        navigate("/detail");
    };

    return (
        <div className="movie-card realtive overflow-hidden group">
            {
                imageLoadError ? (
                    <div className="placeholder-image w-full h-auto bg-gray-300 flex justify-center items-center">
                        <p className="text-gray-500">No Preview Page</p>
                    </div>
                ):(
                    <img
                       src={imageUrl}
                       alt={title}
                       className="w-full h-auto object-cover"
                       onError={()=>setImageLoadError(true)}/>
                )
            }
            {/* Bookmark button */}
            <div className="bookmark-icon absolute top-0 right-0 p-2 z-10">
                <button type="button" onClick={()=>isbookmarked ? removebookmark(TVseriesId) : addtobookmark(TVseriesId)}>
                    <FontAwesomeIcon icon={faBookmark} className={`${isbookmarked} ? "text-yellow-500" : "text-white"`}/>
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