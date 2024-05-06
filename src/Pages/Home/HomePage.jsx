import React,{useState,useEffect} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Trending} from "../../Components/TrendingMovies/Trending";
import {RecommendMovie} from "../../Components/Recommend/Movies/RecoomendMovie";
import {RecommendSeries} from "../../Components/Recommend/TVSeries/RecommendSeries";
import {Navbar} from "../../Components/Navbar";
import {Preloader} from "../../Components/Preloader";
import {setsearchInput} from "../../Redux/Slices/searchSlice";
import axios from "axios";
import {BASE_URL} from "../../BaseURL/basurl";
import toast from "react-hot-toast";

export const HomePage = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [query,setQuery] = useState("");
    const [isLoader,setIsLoader] = useState(false);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const response = await axios.get(`${BASE_URL}/api/v1/search/all/search/${encodeURIComponent(query)}`);
            console.log(response);
            if(response.data.success){
                dispatch(setsearchInput(response.data.searchData));
                navigate("/search/multi");
            }else{
                console.log(response.data.message);
                
            }
        }catch(error){
            console.log(error.response);
            toast.error(error.response.data.message);
        }
    };

    useEffect(()=>{
         setTimeout(() => {
             setIsLoader(true);
         }, 3000);
    },[]);

    return (
        <div>
            <Navbar/>
            <div className="pt-2">
                {/* Search form */}
                <form onSubmit={handleSubmit} className="w-full px-2 sm:px-0 py-2">
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" id="default-search" value={query} onChange={(e) => setQuery(e.target.value)} className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Movies and TvSeries..." />
                        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                </form>

                {/* Conditional rendering based on Loader */}
                {
                    isLoader ? (
                        <div>
                            <div>
                                <h1 className="text-xl p-4 text-cyan-900">Trending Movies</h1>
                                <Trending/>
                            </div>
                            <hr/>
                            <div>
                                <h1 className="text-xl px-4 py-2 text-cyan-900">Recommended Movies</h1>
                                <RecommendMovie/>
                            </div>
                            <hr/>
                            <div>
                                <h1 className="text-xl p-4 text-cyan-900">Recommended Series</h1>
                                <RecommendSeries/>
                            </div>
                        </div>
                    ):(
                        <Preloader/>
                    )
                }
            </div>
        </div>
    )
}