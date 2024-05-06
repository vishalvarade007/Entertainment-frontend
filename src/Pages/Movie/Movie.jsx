import React,{useState,useEffect} from "react";
import {MovieCard} from "./MovieCard";
import {Navbar} from "../../Components/Navbar";
import {Preloader} from "../../Components/Preloader";
import {setsearchInput} from "../../Redux/Slices/searchSlice";
import {setbookmarkmoviedata} from "../../Redux/Slices/detailSlice";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {BASE_URL} from "../../BaseURL/basurl";

export const Movie = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [query,setQuery] = useState("");
    const [isauth,setIsauth] = useState(true);
    const [movie,setMovie] = useState();

    //function to fetch movies
    const getMovies = async()=>{
        try{
            
            const {data} = await axios.get(`${BASE_URL}/api/v1/data/movies`);
            if(data.success){
                setMovie(data.moviedata);
            }
        }catch(error){
            console.log(error);
        }
    };

    //fetching movies on mount
    useEffect(()=>{
       getMovies();
    },[]);

    //function to handle form submission for movie search
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/search/movie/search/${encodeURIComponent(query)}`);
            if (response.data.success) {
                dispatch(setsearchInput(response.data.moviedata)); // Set search input in Redux store
                navigate('/search/movie'); // Navigate to search results page
            } else {
                // Handle no results found
                console.log(response.data.message);
            }
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

     // Check bookmark status when the component mounts
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
                    setIsauth(true); // User is authenticated
                    dispatch(setbookmarkmoviedata(data.bookmarkmovie)); // Set bookmarked movies
                } else {
                    setIsauth(false); // User is not authenticated
                }
            } catch (error) {
                console.log(error);
            }
        };

        checkBookmarkStatus(); // Call the function to check bookmark status
    }, []);
    
    return (
       <div>
          <Navbar/>

          {/* Search Form */}
          <div>
             <form onSubmit={handleSubmit} className="w-full px-2 sm:px-0 py-2">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search" id="deafult-search" value={query} onChange={(e)=>setQuery(e.target.value)} className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Movies..." />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
             </form>
          </div>

          {/* Render movies */}
          <div className="container mx-auto py-8">
            <div className="grid grid-cols-5 px-4 sm:grid-cols-3 2sm:grid-cols-2">
                {
                    movie ? (
                        movie.map((movie)=>{
                            return (
                                <MovieCard 
                                      key={movie._id}
                                      movieid={movie._id}
                                      title={movie.title}
                                      isauth={isauth}
                                      imageUrl={movie.image}
                                      movie={movie}/>
                            )
                        })
                    ):(
                        <div className="absolute left-[50%] right-[50%]">
                            <Preloader/>
                        </div>
                    )
                }
            </div>
          </div>
       </div>
    )
}