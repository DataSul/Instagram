import React, { useState } from "react";
import { Link } from "react-router-dom";
import { db, auth } from "../../Firebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  StyledTitle,
  StyledFormContainer,
  StyledContainer,
  StyledButton,
  StyledErrorMessage,
  StyledForm,
  StyledInputWrapper,
  StyledSignUpLink,
} from "./Signup.styled";

interface RegistrationProps {}

const Signup: React.FC<RegistrationProps> = () => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const navigate = useNavigate();

  const handleFullNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhoneNumber(event.target.value);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const newUser = {
        fullName,
        email,
        password,
        confirmPassword,
        phoneNumber,
        username,
        user: true,
        uid: user.uid,
      };

      const usersRef = collection(db, "Users"); // Create a reference to the "Users" collection
      await addDoc(usersRef, newUser); // Add the user data as a new document in the collection

      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setPhoneNumber("");
      setUsername("");

      console.log("User created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <StyledContainer>
      <StyledFormContainer>
        <StyledForm onSubmit={handleFormSubmit}>
          <StyledInputWrapper>
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={handleFullNameChange}
            />
          </StyledInputWrapper>
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
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
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
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </StyledInputWrapper>
          <StyledInputWrapper>
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
          </StyledInputWrapper>

          {password !== confirmPassword && (
            <StyledErrorMessage>Passwords do not match</StyledErrorMessage>
          )}
          <StyledButton type="submit">Sign up</StyledButton>
        </StyledForm>
        <StyledSignUpLink>
          Already have an account? <Link to="/">Sign in here</Link>.
        </StyledSignUpLink>
      </StyledFormContainer>
    </StyledContainer>
  );
};

export default Signup;
