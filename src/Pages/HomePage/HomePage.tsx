import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LeftNavBar from "../../Components/leftNavBar/LeftNavBar";
import PostFeed from "../../Components/postFeed/PostFeed";
import { auth, db } from "../../Firebase";
import { doc, onSnapshot } from "firebase/firestore";
import {
  StyledHomePageContainer,
  StyledPageContainer,
} from "./HomePage.styled";

interface Props {
  onClose: () => void;
  onUpload: (imageSrc: string, username: string) => void;
  username: string;
}

const HomePage: React.FC<Props> = ({ onClose, onUpload, username }) => {
  const [fetchedUsername, setFetchedUsername] = useState("");
  const [userImage, setUserImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "Users", auth.currentUser?.uid || "dummy"),
      (doc) => {
        if (doc.exists()) {
          setFetchedUsername(doc.data()?.username || "");
          setUserImage(doc.data()?.profileImage || "");
        } else {
          console.log("No such document!");
        }
      }
    );

    const handleUpload = async (imageSrc: string) => {
      if (fetchedUsername.trim() === "") {
        console.log("Username is blank. Cannot upload.");
        return;
      }
      onUpload(imageSrc, fetchedUsername);
    };

    return () => {
      unsubscribe();
    };
  }, [onUpload]);

  const handleUpload = async (imageSrc: string) => {
    onUpload(imageSrc, fetchedUsername);
  };

  const postIdValue = auth.currentUser?.uid || "";
  const userIdValue = auth.currentUser?.uid || "";

  return (
    <>
      <StyledPageContainer>
        <StyledHomePageContainer>
          <PostFeed
            fetchedUsername={fetchedUsername}
            username={fetchedUsername}
            postId={postIdValue}
            userId={userIdValue}
          />
        </StyledHomePageContainer>

        <LeftNavBar
          onClose={onClose}
          onUpload={handleUpload}
          fetchedUsername={fetchedUsername}
          userImage={userImage}
        />
      </StyledPageContainer>
    </>
  );
};

export default HomePage;
