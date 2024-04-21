import React,{useEffect,useState} from "react";
import {RecommendMovieCard} from "./RecommendMovieCard";
import {useDispatch} from "react-redux";
import {Loader} from "../../Loader";
import {setbookmarkmoviedata} from "../../../Redux/Slices/detailSlice";
import axios from "axios";
import {BASE_URL} from "../../../BaseURL/basurl";

export const RecommendMovie = ()=>{
    const dispatch = useDispatch();

    const [isauth,setIsauth] = useState(true);//state to tract authentication status
    const [rmMovies,setrmMovies] = useState();//state to store recommended movies

    //function to fetch recommended movies
    const getMovies = async()=>{
        try{
            const {data} = await axios.get(`${BASE_URL}/api/v1/data/recommend/movies`);
            if(data.success){
                setrmMovies(data);
            }
        }catch(error){
            console.log(error);
        }
    };

    //useEffect hook to fetch recommend movie data on component mount
    useEffect(()=>{
        getMovies();
    },[]);

    //useeffect hook to check bookmark status
    useEffect(()=>{
       const checkbookmarkStatus = async()=>{
        try{
            const {data} = await axios.get(`${BASE_URL}/api/v1/data/bookmark/check`);
            if(data.success){
               setIsauth(true);
               dispatch(setbookmarkmoviedata(data.bookmarkmovie));
            }else{
               setIsauth(false);
            }
        }catch(error){
            console.log(error);
        }
       }

       checkbookmarkStatus();
    },[])
    
    //render the recommended movies or loader
    return (
        <div className="container mx-auto py-8">
           <div className="grid grid-cols-5 gap-4 px-4 sm:grid-cols-3 2sm:grid-cols-2">
              {rmMovies? rmMovies.recommendedmovies.map((movie)=>{
                return <RecommendMovieCard key={movie._id} movie={movie} isauth={isauth}/>
              }):<Loader/>}
           </div>
        </div>
    )


}
