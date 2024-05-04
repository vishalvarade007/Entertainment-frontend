import React from "react";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useSelector} from "react-redux";
import {Navbar} from "./Navbar";

export const MovieDetailsPage = ()=>{
    const content = useSelector((state)=>state.detail.content);
    console.log(content);
    //fucntion to render star rating
    const renderStarRating = (rating)=>{
        const stars = [];
        const roundedRating = Math.round(rating);
        for(let i = 0;i<roundedRating;i++){
            stars.push(<FontAwesomeIcon key={i} icon={faStar} className="text-yellow-500"/>)
        }
        return stars;
    }
    return(
        <div className="min-h-screen bg-gray-100">
            <Navbar/>
            <div className="container mx-auto py-8 px-4 sm:px-0">
                <div className="max-w-4xl mx-auto flex flex-col items-center items-start bg-white rounded-lg overflow-hidden shadow-md">
                    <div className="md:w-1/2 md:mb-0 md:order-first mt-6">
                       <img className="h-auto w-full object-cover" src={content.big_image} alt={content.title}/>
                    </div>
                    <div className="p-8">
                       <h2 className="text-3xl font-semibold text-gray-800 mb-2">{content.title}</h2>
                       <div className="flex items-center text-gray-600">
                        {renderStarRating(parseFloat(content.rating))}
                        <span className="ml-2 text-sm">{content.rating}</span>
                       </div>
                       <p className="text-gray-600 mt-4">{content.description}</p>
                       <div className="mt-4 flex gap-2 flex-wrap">
                        <span className="font-semibold">Genres:</span>
                        {content.genre.map((genre,i)=>{
                            return <span key={i} className="text-indigo-600 border-solid border-2 border-indigo-600 px-2">{genre}</span>
                        })}
                       </div>
                       <div className="mt-2">
                          <span className="font-semibold">Year:</span>
                          <span className="text-gray-600">{content.year}</span>
                       </div>
                       <div className="mt-2">
                           <span className="font-semibold">IMDB rating:</span>
                           <a href={content.imdb_link} rel="noopener noreferrer" target="_blank" className="text-indigo-600">{content.rating}</a>
                       </div>
                       <div className='mt-6 text-center'>
                            <a href={content.imdb_link} target="_blank" rel="noopener noreferrer" className="box-border relative z-30 inline-flex items-center justify-center w-auto px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-indigo-300 ring-offset-indigo-200 hover:ring-offset-indigo-500 ease focus:outline-none">
                                <span className="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
                                <span className="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
                                <span className="relative z-20 flex items-center text-sm">
                                    Visit IMDB
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}