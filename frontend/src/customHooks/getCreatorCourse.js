import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setcreatorCourseData } from "../redux/courseSlice";

const useCreatorCourse = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/course/getCreator",
          { withCredentials: true }
        );

        console.log("API Response:", response.data);

        // Always ensure array
        dispatch(setcreatorCourseData(response.data  ));
      } catch (error) {
        console.log("Creator course error:", error);
        // prevent crash
      }
    };

    fetchCourse();
  }, []);
  
};

export default useCreatorCourse;
