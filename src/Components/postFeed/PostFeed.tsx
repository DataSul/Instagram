import React, { useState, useEffect } from "react";
import {
  StyledGalleryImage,
  StyledActionIcon,
  StyledCaptionName,
  StyledPostActions,
  StyledPostCaption,
  StyledPostContainer,
  StyledPostFooter,
  StyledPostHeader,
  StyledPostImageContainer,
  StyledPostLikes,
  StyledProfileImage,
  StyledProfileName,
  StyledDeleteButton,
} from "./PostFeed.styled";
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import Likes from "../likes/Likes";

interface Props {
  fetchedUsername: string;
  username: string;
  postId: string;
  userId: string;
}

const PostFeed: React.FC<Props> = ({
  fetchedUsername,
  username,
  postId,
  userId,
}) => {
  console.log("ImageGallery fetchedUsername:", fetchedUsername);
  const [images, setImages] = useState<string[]>([]);
  const [selectedPostIndex, setSelectedPostIndex] = useState<number | null>(
    null
  );
  const storage = getStorage();
  const db = getFirestore();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      console.log("fetchedUsername:", fetchedUsername);

      const storageRef = ref(storage, "images");
      const imageList = await listAll(storageRef);
      const imageUrls = await Promise.all(
        imageList.items.map(async (imageRef) => {
          const imageUrl = await getDownloadURL(imageRef);
          return imageUrl;
        })
      );
      setImages(imageUrls);
    } catch (error) {
      console.log("Error fetching images:", error);
    }
  };

  const handleDeletePost = async (index: number) => {
    try {
      const updatedImages = [...images];
      updatedImages.splice(index, 1);
      setImages(updatedImages);

      const postDocRef = doc(db, "posts", postId);
      await deleteDoc(postDocRef);

      const imageName = `image_${postId}`;
      const storageRef = ref(storage, imageName);
      await deleteObject(storageRef);

      const userDocRef = doc(db, "Users", username);
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        const updatedPosts = userData?.posts.filter(
          (postId: string) => postId !== postId
        );
        await setDoc(userDocRef, { posts: updatedPosts });
      }

      console.log("Post deleted successfully.");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <>
      {images.map((imageSrc, index) => (
        <StyledPostContainer key={index}>
          <StyledPostHeader>
            <StyledProfileImage src="https://picsum.photos/50" />
            <StyledProfileName>{fetchedUsername}</StyledProfileName>
          </StyledPostHeader>
          <StyledPostImageContainer>
            <StyledDeleteButton onClick={() => handleDeletePost(index)}>
              <i className="fas fa-trash-alt" />
            </StyledDeleteButton>

            {imageSrc && (
              <StyledGalleryImage src={imageSrc} alt={`Image ${index}`} />
            )}
          </StyledPostImageContainer>
          <StyledPostFooter>
            <StyledPostActions>
              <StyledActionIcon className="far fa-heart" />
              <StyledActionIcon className="far fa-comment" />
              <StyledActionIcon className="far fa-trash-alt" />
            </StyledPostActions>
            <StyledPostLikes>
              <Likes postId={postId} userId={userId} key={postId} />{" "}
            </StyledPostLikes>
            <StyledPostCaption>
              <StyledCaptionName>Caption</StyledCaptionName>
            </StyledPostCaption>
          </StyledPostFooter>
        </StyledPostContainer>
      ))}
    </>
  );
};

export default PostFeed;
