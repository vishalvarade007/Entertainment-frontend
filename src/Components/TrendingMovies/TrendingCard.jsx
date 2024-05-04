import React,{useEffect,useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookmark} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import {useDispatch,useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setcontent} from "../../Redux/Slices/detailSlice";
import axios from "axios";
import {BASE_URL} from "../../BaseURL/basurl";

export const TrendingCard = ({movie,isauth})=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const bookmarkCheck = useSelector(state=>state.detail.moviebookmarkdata);//getting movie bookmark data from redux store

    const [isBookmarked,setIsbookmarked] = useState(false);
    useEffect(()=>{
        //function to check bookmark status
        const checkBookmarkStatus = (id)=>{
            if(id && bookmarkCheck.includes(id)){
                setIsbookmarked(true);
            }else{
                setIsbookmarked(false);
            }
        };
        if(isauth){
            checkBookmarkStatus(movie._id);
        }
    },[movie._id,isauth,bookmarkCheck]);

    //function to add movie to bookmark
    const addtobookmark = async(id)=>{
         try{
            const token = localStorage.getItem("jwtToken");
            const {data} = await axios.post(`${BASE_URL}/api/v1/data/bookmark/add`,{movieId:id},{
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            });
            console.log(data);
            if(data.success){
            setIsbookmarked(true);
            toast.success("bookmark movie");
            }else{
                navigate("/login");
            }
         }catch(error){
            console.log(error);
         }
    };

    //function to remove movie from bookmark
    const removebookmark = async(id)=>{
        try{
            const token = localStorage.getItem("jwtToken");
            const {data} = await axios.delete(`${BASE_URL}/api/v1/data/bookmark/remove/${id}`,{
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            });
            if(data.success){
                setIsbookmarked(false);
                toast.success("unbookmark movie");
            }else{
                navigate("/login");
            }
        }catch(error){
            console.log(error);
        }
    };
    //function to handle play button click
    const isPlay = ()=>{
        dispatch(setcontent(movie));
        navigate("/detail");
    }
    return (
        <div className="movie-card relative flex-shrink-0 w-[20%] sm:w-[30%] 2sm:w-[40%] h-auto mx-2 overflow-hidden group">
          <img src={movie.big_image} alt={movie.title} className="w-full h-full object-cover"/>
          {/* bookmark icon button */}
          <button onClick={()=>isBookmarked?removebookmark(movie._id):addtobookmark(movie._id)} className="bookmark-icon absolute top-0 right-0 p-2 z-10">
            <FontAwesomeIcon icon={faBookmark} className={`${isBookmarked?"text-yellow-500":"text-white"}`}/>
          </button>
          <div className="play-text absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
            {/* play button */}
            <button onClick={isPlay} className="bg-black text-white px-4 py-2 rounded-full ">
               Play
            </button>
            {/* Movie type */}
            <div className="absolute top-0 left-0 bg-black bg-opacity-75 w-full px-4 py-2">
                <p className="text-white text-sm truncate">{movie.type}</p>
            </div>
            {/* Movie title */}
            <div className="absolute bottom-0 left-0 bg-black bg-opacity-75 w-full py-2 px-4">
                <p className="text-white text-sm truncate">{movie.title}</p>
            </div>
          </div>
        </div>
    )
}