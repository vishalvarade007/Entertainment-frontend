import React,{useEffect,useState} from "react";
import {useDispatch} from "react-redux";
import {Loader} from "../../Loader";
import axios from "axios";
import {setbookmarkseriesdata} from "../../../Redux/Slices/detailSlice";
import {RecommendSeriesCard} from "./RecommendSeriesCard";
import {BASE_URL} from "../../../BaseURL/basurl";

export const RecommendSeries = ()=>{
    const dispatch = useDispatch();
    const [isauth,setIsauth] = useState(true);
    const [rSeries,setrSeries] = useState();

    //fucntion to fetch recommended series data 
    const getseries = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/data/recommend/tvseries`);
            if (data.success) {
                setrSeries(data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getseries();
    }, []);

     // Checking bookmark status when component mounts
     useEffect(() => {
        const checkBookmarkStatus = async () => {
            try {
                const token = localStorage.getItem("jwtToken");
                const { data } = await axios.get(`${BASE_URL}/api/v1/data/bookmark/check`,{
                    headers:{
                        Authorization:`Bearer ${token}`,
                    }
                });
                if (data.success) {
                    dispatch(setbookmarkseriesdata(data.bookmarkseries));
                    setIsauth(true);
                } else {
                    setIsauth(false);
                }
            } catch (error) {
                console.log(error);
            }
        };
        checkBookmarkStatus();

    }, []);

    return (
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-5 gap-4 px-4 sm:grid-cols-3 2sm:grid-cols-2">
            {rSeries ? rSeries.recommendedseries.map((series)=>{
                return <RecommendSeriesCard key={series._id} series={series} isauth={isauth}/>
            }):<Loader/>}
          </div>
        </div>
    )
}