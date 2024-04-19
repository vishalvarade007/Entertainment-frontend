import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { TrendingCard } from "./TrendingCard";
import { setbookmarkmoviedata } from "../../Redux/Slices/detailSlice";
import { Loader } from "../Loader";
import axios from "axios";
import { BASE_URL } from "../../BaseURL/basurl";

export const Trending = () => {
    const dispatch = useDispatch();
    const [trend, setTrend] = useState();//state to store trending movie data
    const [isauth, setIsauth] = useState(true);//state to check user authentication

    //function to fetch trending movie data
    const getMovies = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/data/trending/movies`);
            if (data.success) {
                setTrend(data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    //useEffect hook to fetch trending movies data on component mount
    useEffect(() => {
        getMovies();
    }, []);

    //useEffect hook to check user's bookmark status on component mount
    useEffect(() => {
        const checkBookmarkStatus = async () => {
            try {
                const { data } = await axios.get(`${BASE_URL}/api/v1/data/bookmark/check`);
                if (data.success) {
                    dispatch(setbookmarkmoviedata(data.bookmarkmovie));
                    setIsauth(true);
                } else {
                    setIsauth(false);
                }
            }catch(error){
                console.log(error);
            }
        };
       checkBookmarkStatus();
    }, []);
    return (
        <div className="movie-slider flex overflow-x-auto px-3 pb-4 ">
            {/* conditional rendering - if data is fetched then we will show trending card otherwise loader */}
          {trend ? (
            trend.trendingmovies.map((movie)=>{
                return <TrendingCard key={movie._id} movie={movie} isauth={isauth}/>
            })
          ):(
            <Loader/>
          )}
        </div>
    )
}