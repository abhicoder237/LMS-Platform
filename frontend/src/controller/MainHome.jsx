import { useEffect, useState } from "react";
import FullScreenLoader from "../components/FullScreenLoader";
import Home from "../pages/HomePage"

const MainHome = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <FullScreenLoader />;

  return <Home />;
};

export default MainHome;
