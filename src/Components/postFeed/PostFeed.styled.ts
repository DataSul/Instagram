import styled from "styled-components";

export const StyledPostContainer = styled.div`
  width: 400px;
  margin: 0 auto;
  background-color: #ffffff;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 50px;
  border-color: #ccc;
  background-color: black;
`;

export const StyledPostHeader = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 16px;

  background-color: black;
`;

export const StyledProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const StyledPostImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
`;

export const StyledGalleryImage = styled.img`
  width: auto;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  object-position: center;
  margin: auto;
`;

export const StyledPostFooter = styled.div`
  padding: 16px;
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
  color: white;
`;

export const StyledPostLikes = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
  color: white;
`;

export const StyledPostCaption = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  color: white;
`;

export const StyledCaptionName = styled.div`
  font-weight: bold;
  margin-right: 8px;
  color: white;
`;

export const StyledDeleteButton = styled.button`
  position: relative;
  top: 0px;
  right: 0px;
  width: 24px;
  height: 24px;
  background-color: transperant;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  i {
    font-size: 1.2rem;
    color: #333;
  }
`;
export const StyledProfileName = styled.div`
  font-weight: bold;
  color: white;
  margin-left: 8px;
`;
