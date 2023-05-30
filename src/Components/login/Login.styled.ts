import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const StyledFormContainer = styled.div`
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 30px;
`;

export const StyledForm = styled.form`
  max-width: 500px;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  label {
    font-size: 16px;
    margin-bottom: 5px;
  }

  input {
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ccc;
    outline: none;
  }
`;

export const StyledButton = styled.button`
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  background-color: #0077cc;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #005ea8;
  }
`;

export const StyledTitle = styled.h1`
  text-align: center;
  margin-bottom: 30px;
`;
export const StyledSignUpLink = styled.p`
  font-size: 14px;
  color: #777;
  margin-top: 20px;

  a {
    color: #333;
    font-weight: bold;
    text-decoration: none;
    transition: all 0.2s ease-in-out;

    &:hover {
      color: #555;
    }
  }
`;
export const StyledErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 10px;
`;
