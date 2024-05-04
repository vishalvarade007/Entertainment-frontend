import React,{useEffect,useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookmark} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import {useDispatch,useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setcontent} from "../../Redux/Slices/detailSlice";
import axios from "axios";
import {BASE_URL} from "../../BaseURL/basurl";

export const MovieCard = ({movie,imageUrl,title,movieid,isauth})=>{
       const dispatch = useDispatch();
       const navigate = useNavigate();
       const bookmarkCheck = useSelector(state=>state.detail.moviebookmarkdata);

       const [isbookmarked,setIsbookmarked] = useState(false);

       useEffect(()=>{
          const bookmarkCheckStatus = (id)=>{
             if(id && bookmarkCheck.includes(id)){
                setIsbookmarked(true);
             }else{
                setIsbookmarked(false);
             }
          };

          if(isauth){
            bookmarkCheckStatus(movieid);
          }
       },[movieid,bookmarkCheck,isauth]);

       //function to add movie to bookmark
       const addtobookmark = async(id)=>{
         console.log("add is called..");
         
          try{
             const token = localStorage.getItem("jwtToken");
             const {data} = await axios.post(`${BASE_URL}/api/v1/data/bookmark/add`,{movieId:id},{
               headers:{
                  Authorization:`Bearer ${token}`,
               }
             });
             console.log(data);
             if(data.success){
                toast.success("movie bookmarked..");
                
                setIsbookmarked(true);
             }else{
                navigate("/login");
                toast.error("login required");
             }
          }catch(error){
            console.log(error);
          }
       };

       //function remove movie from bookmark
       const removebookmark = async(id)=>{
           try{
            const token = localStorage.getItem("jwtToken");
              const {data} = await axios.delete(`${BASE_URL}/api/v1/data/bookmark/remove/${id}`,{
               headers:{
                  Authorization:`Bearer ${token}`,
               }
              });
              if(data.success){
                  toast.success("movie unbookmarked..");
                  setIsbookmarked(false);
              }else{
                navigate("/login");
                toast.error("login required...");
              }
           }catch(error){
            console.log(error);
             if(!error.response.data.success){
                 navigate("/login");
             }
           }
       };

       //function to handle play button click
       const isPlay = ()=>{
           dispatch(setcontent(movie));
           navigate("detail");
       };
       
       return (
          <div className="movie-card relative overflow-hidden group">
             <img src={imageUrl} alt={title} className="w-full h-auto object-cover"/>
             {/* Bookmark button */}
             <button type="button" onClick={()=>isbookmarked ? removebookmark(movieid) : addtobookmark(movieid)} className="bookmark-icon absolute top-0 right-0 p-2 z-10">
                <FontAwesomeIcon icon={faBookmark} className={isbookmarked ? "text-yellow-500" : "text-white"}/>
             </button>
             <div className="play-text absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                {/* Play button */}
                <button className="bg-black text-white px-4 py-2 rounded-full" onClick={isPlay}>Play</button>
                <div className="absolute top-0 left-0 bg-black bg-opacity-75 w-full py-2 px-4 ">
                    <p className="text-white text-sm truncate">{movie.type}</p>
                </div>
                {/* Movie title */}
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-75 w-full py-2 px-4 ">
                    <p className="text-white text-sm truncate">{title}</p>
                </div>
             </div>
          </div>
       )
}