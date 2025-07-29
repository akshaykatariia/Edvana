import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { AppContext } from "../../context/AppContext";
import React, { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";


const Navbar = () => {
  const { navigate, isEducator, backendUrl, setIsEducator, getToken } =
    useContext(AppContext);

  const isCourseListPage = location.pathname.includes("/course-list"); // checks i am in under which course /course-list/java like this, if yes than true
  const { openSignIn } = useClerk(); // on click open sign in
  const { user } = useUser();

  const becomeEducator = async () => {
    try {
      if (isEducator) {
        navigate("/educator");
        return;
      }

      const token = await getToken();
      const { data } = await axios.get(
        backendUrl + "/api/educator/update-role",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.success) {
        setIsEducator(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className={`flex items-center justify-between px-80 sm:px-10 md:px-14
                       lg:px-36 border-b border-gray-500 py-4 ${
                         isCourseListPage ? "bg-white" : "bg-cyan-100/70"
                       }`}
    >
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt=" logo"
        className="w-28 lg:w-32 cursor-pointer"
      />
      <div
        className="hidden md:flex items-center gap-5
      text-gray-500"
      >
        {" "}
        {/* this div is for dekstop and next is for mobile screen*/}
        <div>
          {user && ( // whenever user is loggeed in than only we will display becom. buttons
            <>
              <button onClick={becomeEducator}>
                {isEducator ? "Educator Dashboard" : "Become Educator"} |{" "}
              </button>
              <Link to="/my-enrollment"> My Enrollments</Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="bg-blue-600 text-white 
          px-5 py-2 rounded-full"
          >
            Create Account
          </button>
        )}
      </div>

      {/* for phone screens*/}
      <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-500">
        {" "}
        {/*this is to hide mid i.e dekstop screen */}
        <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs"></div>
        <div>
          {user && (
            <>
              <button onClick={becomeEducator}>
                {isEducator ? "Educator Dashboard" : "Become Educator"} |{" "}
              </button>
              <Link to="/my-enrollment"> My Enrollments</Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button onClick={() => openSignIn()}>
            {" "}
            <img src={assets.user_icon} alt="" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
