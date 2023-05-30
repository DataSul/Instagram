import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  StyledButton,
  StyledForm,
  StyledInputWrapper,
  StyledTitle,
  StyledSignUpLink,
  StyledContainer,
  StyledErrorMessage,
} from "./Login.styled";
import { Link } from "react-router-dom";
import { db } from "../../Firebase";
import { getDoc, doc } from "firebase/firestore";

interface LoginPageProps {}

const Login: React.FC<LoginPageProps> = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);

      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDocRef = doc(db, "Users", currentUser.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          const username = userData.username;
          console.log("Username:", username);

          localStorage.setItem("username", username);
        }
      }

      navigate("/home");
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("Invalid email or password");
    }
  };
  return (
    <StyledContainer>
      <StyledForm onSubmit={handleFormSubmit}>
        <StyledTitle>Login</StyledTitle>
        <StyledInputWrapper>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </StyledInputWrapper>
        <StyledInputWrapper>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </StyledInputWrapper>
        <StyledInputWrapper>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </StyledInputWrapper>
        <StyledButton type="submit">Login</StyledButton>
        <StyledErrorMessage>{errorMessage}</StyledErrorMessage>
        <StyledSignUpLink>
          Don't have an account? <Link to="/signup">Sign up here</Link>.
        </StyledSignUpLink>
      </StyledForm>
    </StyledContainer>
  );
};

export default Login;
