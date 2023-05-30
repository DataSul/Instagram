import styled from "styled-components";
import { AiOutlineInstagram, AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";

export const StyledNavContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 10%;
  background-color: black;
`;
export const StyledInstaIcon = styled(AiOutlineInstagram)`
  font-size: 40px;
  margin-bottom: 30px;
  margin-right: 10px;
  color: white;
`;

export const StyledNavItem = styled.div`
  color: white;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  background-color: ${(props: { active?: boolean }) =>
    props.active ? "#ccc" : "transparent"};
  background-color: black;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.04);
  }
`;
export const StyledLink = styled(Link)`
  color: white;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  background-color: ${(props: { active?: boolean }) =>
    props.active ? "#ccc" : "transparent"};
  background-color: #141412;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;
export const StyledProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const StyledProfileName = styled.span`
  font-size: 14px;
  font-weight: bold;
`;
