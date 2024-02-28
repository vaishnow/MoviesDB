import React from "react";
import Profile from "../components/Profile";
import UserLists from "../components/UserLists";

function Dashboard() {
  return (
    <section className="mdb-page p-5">
        <Profile />
        <UserLists />
    </section>
  );
}

export default Dashboard;
