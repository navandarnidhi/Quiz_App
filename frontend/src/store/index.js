import {configureStore} from "@reduxjs/toolkit"
import fetchDataSlice from "./fetchDataSlice"
const quesByCtgStore = configureStore({
  reducer: {
    fetchData: fetchDataSlice.reducer,

  }
});
export default quesByCtgStore;