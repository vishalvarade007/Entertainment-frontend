import React,{useEffect,useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookmark} from "@fortawesome/free-solid-svg-icons";
import {useDispatch,useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setcontent} from "../../../Redux/Slices/detailSlice";
import axios from "axios";

export const RecommendMovieCard = ({movie,isauth})=>{
     const dispatch = useDispatch();
     const navigate = useNavigate();
     const bookmarkCheck = useSelector(state=>state.detail.moviebookmarkdata);

     const [isbookmarked,setIsbookmarked] = useState(false);

     useEffect(()=>{
         //function to check whether movie is bookmarked or not
         const checkBookmarkStatus = (id)=>{
            if(id && bookmarkCheck.includes(id)){
                setIsbookmarked(true);
            }else{
                setIsbookmarked(false)
            }
         };
         if(isauth){
            checkBookmarkStatus(movie._id);
         }
     },[movie._id,isauth,bookmarkCheck]);
}