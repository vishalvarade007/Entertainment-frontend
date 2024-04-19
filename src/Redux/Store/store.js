import {configureStore} from "@reduxjs/toolkit";
import detailSlice from "../Slices/detailSlice";
import searchSlice from "../Slices/searchSlice";

export default configureStore({
    reducer:{
        detail:detailSlice,
        search:searchSlice
    }
});