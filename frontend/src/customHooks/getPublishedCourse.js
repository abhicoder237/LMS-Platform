import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setcourseData } from '../redux/courseSlice'
import { serverUrl } from '../App'

const usePublishedCourse = () => {
    const dispatch = useDispatch()
      useEffect(()=>{
        const fetchCourse = async ()=>{
            try {
                const response = await axios.get(`${serverUrl}/api/course/get_Pub_course`,{ withCredentials: true })
                console.log("getCourse Data" , response.data)
                dispatch(setcourseData(response.data))

            } catch (error) {
                console.log("Error in getCourseData" , error)
            }
        }
        fetchCourse()
      },[])
}

export default usePublishedCourse