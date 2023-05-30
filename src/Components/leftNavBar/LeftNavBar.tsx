import React, { useState } from "react";
import {
  StyledNavContainer,
  StyledNavItem,
  StyledInstaIcon,
  StyledProfileImage,
  StyledProfileName,
} from "./LeftNavBar.styled";
import { useNavigate } from "react-router-dom";
import Post from "../Post/Post";
import { signOut } from "firebase/auth";
import { auth, db } from "../../Firebase";
import { doc, getDoc } from "firebase/firestore";

export interface LeftNavBarProps {
  onClose: () => void;
  onUpload?: (imageSrc: string, username: string) => void;
  fetchedUsername: string;
  userImage: string;
}

const LeftNavBar: React.FC<LeftNavBarProps> = ({
  onClose,
  onUpload = () => {},
  fetchedUsername,
  userImage,
}) => {
  const [activeNavItem, setActiveNavItem] = useState("home");
  const navigate = useNavigate();
  const [showUploadPopup, setShowUploadPopup] = useState(false);

  const handleNavItem = (item: string) => {
    setActiveNavItem(item);
    if (item === "upload") {
      setShowUploadPopup(true);
    } else if (item === "home") {
      navigate("/");
    } else if (item === "explore") {
      navigate("/explore");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleUpload = (imageSrc: string, username: string) => {
    if (username.trim() === "") {
      console.error("Username is blank. Cannot upload.");
      return;
    }

    onUpload(imageSrc, username);
  };
  return (
    <StyledNavContainer>
      <StyledInstaIcon />
      <StyledNavItem
        active={activeNavItem === "home"}
        onClick={() => handleNavItem("home")}
      >
        Home
      </StyledNavItem>
      <StyledNavItem
        active={activeNavItem === "explore"}
        onClick={() => handleNavItem("explore")}
      >
        Explore
      </StyledNavItem>
      <StyledNavItem
        active={activeNavItem === "upload"}
        onClick={() => handleNavItem("upload")}
      >
        Upload
      </StyledNavItem>
      <StyledNavItem active={activeNavItem === "logout"} onClick={handleLogout}>
        Logout
      </StyledNavItem>

      {showUploadPopup && (
        <Post
          onClose={() => setShowUploadPopup(false)}
          onUpload={handleUpload}
          fetchedUsername={fetchedUsername}
        />
      )}
    </StyledNavContainer>
  );
};

export default LeftNavBar;
