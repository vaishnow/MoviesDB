import React from "react";
import Profile from "../components/Profile";
import UserLists from "../components/UserLists";
import UserProvider from "../contexts/UserProvider";

function Dashboard() {
  return (
    <section className="mdb-page p-5">
      <UserProvider>
        <Profile />
        <UserLists />
      </UserProvider>
    </section>
  );
}

export default Dashboard;
