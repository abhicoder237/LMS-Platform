 import { createSlice } from '@reduxjs/toolkit'

const lectureSlice = createSlice({
    name: "course",
    initialState: {
        
        lectureData : [] ,
        loading: false  // Refresh पर unnecessary loading avoid
    },
    reducers: {
        
         setlectureData: (state, action) => {
            state.lectureData = action.payload
            state.loading = false
        },
        setCourseLoading: (state) => {
            state.loading = true
        }
    }
})

export const {  setCourseLoading , setlectureData } = lectureSlice.actions
export default lectureSlice.reducer
