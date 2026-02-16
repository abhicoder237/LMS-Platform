import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import useCurrentUser from "./customHooks/getCurrentUser";
import Dashboard from "./pages/educator/Dashboard";
import CreatorCourse from "./pages/educator/CreatorCourse";
import CreateCourse from "./pages/educator/CreateCourse";
// import useCreatorCourse from "./customHooks/getCreatorCourse";
import EditCourse from "./pages/educator/EditCourse";
import AllCourse from "./pages/educator/AllCourse";
import CreateLecture from "./pages/Lecture/CreateLecture";
import EditLecture from "./pages/Lecture/EditLecture";
import CourseDetails from "./pages/CourseDetails";
import SearchAi from "./controller/SearchAi";
import About from "./pages/About";
import FullScreenLoader from "./controller/FullLoader";

export const serverUrl = "https://learnx-e3va.onrender.com"

const App = () => {
  useCurrentUser();

  const { userData, loading } = useSelector((state) => state.user);

  if (loading) return <div><FullScreenLoader/></div>;

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            zIndex: 999999,
          },
        }}
      />

      <Routes>
        {/* HomePage accessible to everyone */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/allCourse" element={userData ? <AllCourse /> : <Navigate to="/" />} />

        {/* Auth routes */}
        <Route
          path="/register"
          element={!userData ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!userData ? <Login /> : <Navigate to="/" />}
        />

        {/* Protected routes */}
        <Route
          path="/profile"
          element={userData ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard"
          element={userData?.user?.role === "educator" ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/creatorcpurse"
          element={userData?.user?.role === "educator" ? <CreatorCourse /> : <Navigate to="/login" />}
        />
        <Route
          path="/createcourse"
          element={userData?.user?.role === "educator" ? <CreateCourse /> : <Navigate to="/login" />}
        />
        <Route
          path="/editcourse/:courseId"
          element={userData?.user?.role === "educator" ? <EditCourse /> : <Navigate to="/login" />}
        />

        <Route
          path="/create_lecture/:courseId"
          element={userData?.user?.role === "educator" ? <CreateLecture /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit_lecture/:courseId/:lectureId"
          element={userData?.user?.role === "educator" ? <EditLecture /> : <Navigate to="/login" />}
        />

        <Route
          path="/course_Details/:courseId"
          element={userData ? <CourseDetails /> : <Navigate to="/login" />}
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />

        {/* Ai search  */}
        {/* <Route path="/search" element = {userData ? <SearchAi /> : <Navigate to="/login" /> }/> */}
      </Routes>
    </>
  );
};

export default App;
