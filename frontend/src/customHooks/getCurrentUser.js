 import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData, clearUserData } from "../redux/userSlice";

const useCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token"); // get your token from storage
        const res = await axios.get(
          "http://localhost:5000/api/user/get_currUser",
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true, // correct syntax
          }
        );

        dispatch(setUserData(res.data));
      } catch (error) {
        console.log(error);
        dispatch(clearUserData());
      }
    };

    fetchUser();
  }, [dispatch]);
};

export default useCurrentUser;
