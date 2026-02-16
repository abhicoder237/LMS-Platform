 import { createSlice } from '@reduxjs/toolkit'

const courseSlice = createSlice({
    name: "course",
    initialState: {
        creatorCourseData: [],
        courseData : [] ,
        selectedCourse : [],
        loading: false  // Refresh पर unnecessary loading avoid
    },
    reducers: {
        setcreatorCourseData: (state, action) => {
            state.creatorCourseData = action.payload
            state.loading = false
        },
         setcourseData: (state, action) => {
            state.courseData = action.payload
            state.loading = false
        },
        setSelectedCourse:(state , action)=>{
             state.selectedCourse = action.payload
             state.loading = false
        },
        clearcreatorCourseData: (state) => {
            state.creatorCourseData = null
            state.loading = false
        },
        setCourseLoading: (state) => {
            state.loading = true
        }
    }
})

export const { setcreatorCourseData, clearcreatorCourseData, setCourseLoading , setcourseData  , setSelectedCourse} = courseSlice.actions
export default courseSlice.reducer
