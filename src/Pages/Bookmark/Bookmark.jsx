import React,{useState,useEffect} from "react";
import {Navbar} from "../../Components/Navbar";
import {MovieBookmarkCard} from "./MovieBookmarkCard";
import {TVBookmarkCard} from "./TVBookmarkCard";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setsearchInput} from "../../Redux/Slices/searchSlice";
import {Loader} from "../../Components/Loader";
import axios from "axios";
import {BASE_URL} from "../../BaseURL/basurl";

export const Bookmark = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //state variables
    const [query,setQuery] = useState("");
    const [bookmark,setBookmark] = useState(null);
 
    //function to fetch bookmark data
    const getBookmark = async()=>{
        
        try{
            const token = localStorage.getItem("jwtToken");
            const {data} = await axios.get(`${BASE_URL}/api/v1/data/bookmark`,{
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            });
           
            if(data.success){
                setBookmark(data.bookmark);
            }else{
                navigate("/login");
            }
        }catch(error){
            console.log(error);
        }
    };

    //function to remove bookmark card
    const removeBookmarkCard = (id)=>{
        setBookmark(prevState =>({
            ...prevState,
            bookmarkmovie:prevState.bookmarkmovie.filter(movie=>movie._id !== id),
            bookmarkseries:prevState.bookmarkseries.filter(series=>series._id !== id),
        }))
    };

    useEffect(()=>{
        getBookmark();
    },[]);

    //function to handle form submission
    const handleSubmit = async(e)=>{
         e.preventDefault();
         try{
            const token = localStorage.getItem("jwtToken");
            const response = await axios.get(`${BASE_URL}/api/v1/data/bookmark/search/${encodeURIComponent(query)}`,{
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            });
            if(response.data.success){
                dispatch(setsearchInput(response.data.searchData));
                navigate("/search/bookmark")
            }else{
                console.log(response.data.message);
            }
         }catch(error){
            console.log(error);
         }
    };

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
                    <input type="search" id="default-search" value={query} onChange={(e) => setQuery(e.target.value)} className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Bookmark shows..." />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>
            {/* Bookmark movies */}
            <div className="container mx-auto py-2">
                <h1 className="px-4 pb-2 text-xl text-cyan-600">Bookmark Movies</h1>
                <div className="grid grid-cols-5 gap-4 px-4 sm:grid-cols-3 2sm:grid-cols-2">
                    {bookmark ? bookmark.bookmarkmovie.length !== 0 ? (
                        bookmark.bookmarkmovie.map((movie,i)=>{
                            return <MovieBookmarkCard key={i} movie={movie} removeBookmarkCard={removeBookmarkCard}/>
                        })
                    ):<p>No bookmark Movie found !!</p>:(<Loader/>)}
                </div>
                {/* Bookmark TV Series */}
                <h1 className="p-4 text-xl text-cyan-600">Bookmark TVSeries</h1>
                <div className="grid grid-cols-5 px-4 sm:grid-cols-3 2sm:grid-cols-2">
                    {bookmark ? bookmark.bookmarkseries.length !== 0 ? (
                        bookmark.bookmarkseries.map((series,i)=>{
                            return <TVBookmarkCard key={i} series={series} removeBookmarkCard={removeBookmarkCard}/>
                        })
                    ):<p>No bookmark Series found !!</p>:(<Loader/>)}
                </div>
            </div>
        </div>
    )
}