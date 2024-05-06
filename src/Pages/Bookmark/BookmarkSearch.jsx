import React,{useEffect,useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import {navigate, useNavigate} from "react-router-dom";
import {Navbar} from "../../Components/Navbar";
import {MovieCard} from "../Movie/MovieCard";
import {TVSeriesCard} from "../TVSeries/TVSeriesCard";
import {setbookmarkmoviedata,setbookmarkseriesdata} from "../../Redux/Slices/detailSlice";
import axios from "axios";
import {BASE_URL} from "../../BaseURL/basurl";

export const BookmarkSearch = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchState = useSelector((state)=>state.search.searchInput);

    const [search,setSearch] = useState(searchState);
    const [query,setQuery] = useState("");
    const [isauth,setIsauth] = useState(true);

    const handleSubmit = async(e)=>{
        
        e.preventDefault();
        try{
            const token = localStorage.getItem("jwtToken");
            const {data} = await axios.get(`${BASE_URL}/api/v1/data/bookmark/search/${encodeURIComponent(query)}`,{
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            });
            if(data.success){
                setSearch(data.searchdata);
            }else{
                console.log(data.message);
            }
        }catch(error){
            console.log(error);
        }
    };

    useEffect(()=>{
        const checkBookmarkStatus = async()=>{
            
            try{
                const token = localStorage.getItem("jwtToken");
                const {data} = await axios.get(`${BASE_URL}/api/v1/data/bookmark/check`,{
                    headers:{
                        Authorization:`Bearer ${token}`,
                    }
                });
                if(data.success){
                    setIsauth(true);
                    dispatch(setbookmarkmoviedata(data.bookmarkmovie));
                    dispatch(setbookmarkseriesdata(data.bookmarkseries));
                }else{
                    setIsauth(false);
                }
            }catch(error){
                if(!error.response.data.success){
                    navigate("/login");
                }
                console.log(error);
            }
        };

        checkBookmarkStatus();
    },[]);

    return (
        <div>
            <Navbar/>
            {/* Search form */}
            <form onSubmit={handleSubmit} className="w-full px-2 sm:px-0 py-2">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search" id="default-search" value={query} onChange={(e) => setQuery(e.target.value)} className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Bookmark Shows..." />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>
            {/* Displaying the results */}
            <div className="grid grid-cols-5 px-4 sm:grid-cols-3 grid-cols-2 py-2">
                {
                    search ? (
                        search.map((data)=>{
                            return (data.type === "movie"? (
                                <MovieCard
                                     key={data._id}
                                     movie={data}
                                     title={data.title}
                                     imageUrl={data.image}
                                     movieid={data._id}
                                     isauth={isauth}/>
                            ):(
                                <TVSeriesCard
                                     key={data._id}
                                     TVSeriescontent={data}
                                     title={data.title}
                                     imageUrl={data.big_image}
                                     TVseriesId={data._id}
                                     isauth={isauth}/>
                            )
                        )})
                    ):(
                        <p>Not Found !!</p>
                    )
                }
            </div>
        </div>
    )


}