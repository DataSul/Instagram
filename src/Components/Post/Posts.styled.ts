import styled from "styled-components";

export const StyledUploadPopup = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

export const StyledUploadPopupContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

export const StyledUploadInput = styled.input`
  display: block;
  margin: 20px auto;
`;

export const StyledUploadButton = styled.button`
  background-color: #1da1f2;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
`;

export const StyledExitButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;

export const StyledPostContainer = styled.div`
  background-color: white;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  margin: 20px auto;
  max-width: 600px;
`;

export const StyledPostHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
`;

export const StyledProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const StyledProfileName = styled.div`
  font-weight: bold;
`;

export const StyledPostImage = styled.img`
  width: 100%;
  height: auto;
`;

export const StyledPostUsername = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
`;

export const StyledPostTimestamp = styled.div`
  color: #8e8e8e;
`;

export const StyledPostActions = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

export const StyledActionIcon = styled.i`
  font-size: 1.5rem;
  margin-right: 16px;
  cursor: pointer;
`;

export const StyledPostLikes = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
`;

export const StyledPostCaption = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

export const StyledCaptionName = styled.div`
  font-weight: bold;
  margin-right: 8px;
`;

export const StyledDeleteButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background-color: #f5f5f5;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: #dbdbdb;
  }

  i {
    font-size: 1.2rem;
    color: #333;
  }
`;
