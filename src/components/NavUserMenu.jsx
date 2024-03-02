import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { useUserDetail } from "../contexts/UserProvider";

const NavUserMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { setUserDetails } = useUserDetail();

  const open = Boolean(anchorEl);
  const isLoggedIn = sessionStorage.getItem("token");

  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userdata");
    setUserDetails({});
    navigate();
  };

  return (
    <>
      <Tooltip title={isLoggedIn ? "Account settings" : "Join MDB"}>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ mr: isLoggedIn ? 2 : 1 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          {isLoggedIn ? (
            <Avatar sx={{ bgcolor: "#444", width: 40, height: 40 }}></Avatar>
          ) : (
            <button className="btn dark:text-mdb-light">Join </button>
          )}
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{ mr: 2 }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        id="account-menu"
        open={open}
      >
        <div onClick={handleClose}>
          {isLoggedIn ? (
            <MenuItem onClick={() => navigate("dashboard")}>Profile</MenuItem>
          ) : (
            <>
              <MenuItem onClick={() => navigate("user/login")}>
                Sign in
              </MenuItem>
              <MenuItem onClick={() => navigate("user/register")}>
                Sign up
              </MenuItem>
            </>
          )}
        </div>
        {isLoggedIn && (
          <MenuItem onClick={handleClose} sx={{ px: "10px" }}>
            <button
              onClick={handleLogout}
              className="btn bg-mdb-red text-white w-full"
            >
              Logout
            </button>
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default NavUserMenu;
