import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  selectAuthLoading, selectGeneralAuthError, selectSigninError } from "../../features/Auth/authSlice";

import styles from "./Login.module.css";
import TextInput from "../../components/ui/Inputs/TextInput/TextInput";
import TextButton from "../../components/ui/Buttons/TextButton/TextButton";
import { FormWrapper } from "../../components/ui/Wrappers/FormWrapper/FormWrapper";
import { signinThunk } from "../../features/Auth/Thunks/SigninThunk";
import { IsAuthenticated } from "../../components/Auth/IsAuthenticated/IsAuthenticated";
import Label from "../../components/ui/Titles/Label/Label";
import { useNavigate } from "react-router";
import { LineSpacer } from "../../components/ui/Spacers/LineSpacer/LineSpacer";
import GoogleLoginButton from "../../components/GoogleLoginButton/GoogleLoginButton";

const Login = () => {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const altError = useSelector(selectGeneralAuthError);

  const error = useSelector(selectSigninError);

  const loading = useSelector(selectAuthLoading);

  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    
    dispatch(signinThunk({email, password}));
  };

  const redirect = () => {
    navigate('/signup')
  }

  const resetPassword = () => {
    navigate('/reset-password')
  }

  return (
    <IsAuthenticated>
        <FormWrapper error={altError} header="BUBBLE" onSubmit={handleLogin} loading={loading}>
            <Label label="Log in to your Bubble Account"/>
            <TextInput
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e)}
              error={error}
              autoComplete={'email'}
            />
            <TextInput
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e)}
              error={error}
              autoComplete={'password'}
            />
           
            <TextButton  action={handleLogin} title="Log In" />
            <TextButton action={redirect} title="Sign Up" />
             <GoogleLoginButton />
            <LineSpacer />
            <TextButton title="Forgot Password" action={resetPassword} />
        </FormWrapper>
    </IsAuthenticated>
  );
};

export default Login;
