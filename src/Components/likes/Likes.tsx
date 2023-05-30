import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase";

interface LikesProps {
  postId: string;
  userId: string;
}

const Likes: React.FC<LikesProps> = ({ postId, userId }) => {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchLikes = async () => {
      const docRef = doc(db, "posts", postId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const postData = docSnap.data();
        setLikes(postData.likes || 0);
        setIsLiked(postData.usersLiked?.includes(userId) || false);
      }
    };

    fetchLikes();
  }, [postId, userId]);

  const handleLike = async () => {
    console.log("handleLike called");

    try {
      const docRef = doc(db, "posts", postId);

      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const postData = docSnap.data();
        console.log("postData:", postData);

        const updatedLikes = postData.likes + (isLiked ? -1 : 1);
        console.log("updatedLikes:", updatedLikes);

        const updatedUsersLiked = isLiked
          ? postData.usersLiked.filter((id: string) => id !== userId)
          : [...postData.usersLiked, userId];
        console.log("updatedUsersLiked:", updatedUsersLiked);

        console.log("Before updateDoc");
        await updateDoc(docRef, {
          likes: updatedLikes,
          usersLiked: updatedUsersLiked,
        });
        console.log("After updateDoc");

        setLikes(updatedLikes);
        setIsLiked(!isLiked);
      }
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  return (
    <div>
      <button onClick={handleLike}>{isLiked ? "Unlike" : "Like"}</button>
      <span>
        {likes} {likes === 1 ? "like" : "likes"}
      </span>
    </div>
  );
};

export default Likes;
