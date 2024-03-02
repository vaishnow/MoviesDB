import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../api/moviesDB";
import { useUserDetail } from "../contexts/UserProvider";
import backdrop from "../assets/logo.svg";
import "./Profile.css";

const Profile = () => {
  const { userDetails, setUserDetails } = useUserDetail();
  const navigate = useNavigate();

  const getUserDetails = async () => {
    const result = await getUserData();
    if (result.status === 200) {
      setUserDetails(result.data.userdata);
    } else {
      alert(`An error occured, please try again later`);
      navigate("/user/register");
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
          src="/icons/favicon.svg"
          className="mx-auto sm:ml-4 border-2 profile-img"
        ></img>
      </div>
      <div className="px-5 pt-28 text-center sm:text-left min-h-52">
        <h1 className="text-3xl font-semibold">{userDetails.username}</h1>
        <p className="text-gray-500">{userDetails.email}</p>
      </div>
    </div>
  );
};

export default Profile;
