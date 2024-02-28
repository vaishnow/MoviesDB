import { useUserDetail } from "../contexts/UserProvider";
import useUserList from "../hooks/useUserList";
import UserList from "./UserList";

const UserLists = () => {
  const {
    userDetails: { username },
  } = useUserDetail();
  const { list: likedList } = useUserList(username, "liked");
  const { list: savedList } = useUserList(username, "saved");

  return (
    <div className="grid lg:grid-cols-2 gap-10">
      <UserList listname="Watch Later" listdata={savedList} />
      <UserList listname="Liked" listdata={likedList} />
    </div>
  );
};

export default UserLists;
