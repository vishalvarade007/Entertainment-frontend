import "./App.css";
import {Bookmark} from "./Pages/Bookmark/Bookmark";
import {HomePage} from "./Pages/Home/HomePage";
import {Login} from "./Pages/Login";
import {Register} from "./Pages/Register";
import {Movie} from "./Pages/Movie/Movie";
import {TVSeries} from "./Pages/TVSeries/TVSeries";
import {Route,Routes} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import {MovieDetailsPage} from "./Components/DetailComponent";
import {MultiSearch} from "./Pages/Home/MultiSearch";
import {MovieSearch} from "./Pages/Movie/MovieSearch";
import {TVSearch} from "./Pages/TVSeries/TVSearch";
import {BookmarkSearch} from "./Pages/Bookmark/BookmarkSearch";
import {Preloader} from "./Components/Preloader";



function App() {

  return (
    <>
       <Toaster
          position="top-right"
          reverseOrder={false}/>

          {/* Routing */}
          <Routes>
            <Route exact path="/" element={<HomePage/>}/>
            <Route exact path="/register" element={<Register/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/movies" element={<Movie/>}/>
            <Route exact path="/tvseries" element={<TVSeries/>}/>
            <Route exact path="/bookmark" element={<Bookmark/>}/>
            <Route exact path="/detail" element={<MovieDetailsPage/>}/>
            <Route exact path="/search/movie" element={<MovieSearch/>}/>
            <Route exact path="/search/series" element={<TVSearch/>}/>
            <Route exact path="/search/multi" element={<MultiSearch/>}/>
            <Route exact path="/search/bookmark" element={<BookmarkSearch/>}/>
            <Route exact path="/preloader" element={<Preloader/>}/>
          </Routes>

    </>
  );
}

export default App;
