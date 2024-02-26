import React from "react";
import Profile from "../components/Profile";
import UserProvider from "../contexts/UserProvider";

function Dashboard() {
  return (
    <section className="mdb-page p-5">
      <UserProvider>
        <Profile />
      </UserProvider>
    </section>
  );
}

export default Dashboard;
