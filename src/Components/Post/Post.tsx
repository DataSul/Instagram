import React, { useState } from "react";
import {
  StyledUploadPopup,
  StyledUploadPopupContent,
  StyledUploadInput,
  StyledUploadButton,
  StyledExitButton,
  StyledPostImage,
} from "./Posts.styled";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, db } from "../../Firebase";

interface Props {
  onClose: () => void;
  onUpload: (imageSrc: string, username: string) => void;
  fetchedUsername: string;
}

const Post: React.FC<Props> = ({ onClose, onUpload, fetchedUsername }) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [username, setUsername] = useState(fetchedUsername);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setPreviewImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (file) {
      try {
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        const newPost = {
          imageSrc: downloadURL,
          username: username.trim(),
        };
        const docRef = await addDoc(collection(db, "posts"), newPost);
        onUpload(newPost.imageSrc, newPost.username);
        console.log("Post uploaded successfully with ID: ", docRef.id);
        onClose();
      } catch (error) {
        console.error("Error uploading post:", error);
      }
    }
  };

  return (
    <StyledUploadPopup>
      <StyledUploadPopupContent>
        <StyledExitButton onClick={onClose}>✕</StyledExitButton>
        <StyledUploadInput
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        {previewImage && <StyledPostImage src={previewImage} alt="Post" />}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        />
        <StyledUploadButton onClick={handleUpload}>Upload</StyledUploadButton>
      </StyledUploadPopupContent>
    </StyledUploadPopup>
  );
};

export default Post;
