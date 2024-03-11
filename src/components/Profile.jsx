import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserData } from "../api/moviesDB";
import { useUserDetail } from "../contexts/UserProvider";
import ProfileEdit from "./ProfileEdit";
import backdrop from "../assets/logo.svg";
import "./Profile.css";

const Profile = () => {
  const { userDetails, setUserDetails } = useUserDetail();
  const navigate = useNavigate();

  const getUserDetails = async () => {
    const result = await getUserData();
    if (result.status === 200) {
      setUserDetails(result.data?.userdata);
    } else {
      toast.error(`Something went wrong`);
      setTimeout(() => {
        navigate("/user/login");
      }, 2000);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="rounded bg-gray-300 dark:bg-mdb-sec-300 mb-5">
      <div className="h-52">
        <img src={backdrop} className="w-full h-full object-cover" alt="" />
      </div>
      <div className="h-0">
        <img
          src={userDetails?.userimgurl}
          className="mx-auto sm:ml-4 border-2 bg-slate-200 profile-img"
        ></img>
      </div>
      <div className="px-5 text-center sm:text-left min-h-52">
        <ProfileEdit />
        <h1 className="text-3xl font-semibold">{userDetails.username}</h1>
        <p className="text-gray-500">{userDetails.email}</p>
      </div>
    </div>
  );
};

export default Profile;
