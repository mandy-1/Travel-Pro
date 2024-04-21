import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../../context/darkModeContext";
import { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Modal } from "@mui/material";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();

  function modalPopUp() {
    var buttons = document.querySelectorAll(".toggle-button");
    var modal = document.querySelector("#modal");

    [].forEach.call(buttons, function (button) {
      button.addEventListener("click", function () {
        modal.classList.toggle("off");
      });
    });
  }

  return (
    <div className="navbar">

      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          {/* <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div> */}
          <div className="item">
            {isAuthenticated &&
              <div className="user-info">
                <img
                  src={user?.picture}
                  alt=""
                  className="avatar"
                />
                <p className="p-login">
                  {user.name}
                </p>
              </div>
            }
            <button className="btn-logout" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Navbar;
