import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, selectAuthLoading, selectEmailError, selectGeneralAuthError, selectPasswordError, selectSigninError } from "../../features/Auth/AuthSlice";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { motion } from "framer-motion";
import TextInput from "../../components/Inputs/TextInput/TextInput";
import TextButton from "../../components/Buttons/TextButton/TextButton";
import Label from "../../components/Titles/Label/Label";
import Header from "../../components/Titles/Header/Header";
import TextNavButton from "../../components/NavButtons/TextNavButton/TextNavButton";
import { FormWrapper } from "../../components/Wrappers/FormWrapper/FormWrapper";
import { signinThunk } from "../../features/Auth/Thunks/SigninThunk";
import { IsAuthenticated } from "../../components/Auth/IsAuthenticated/IsAuthenticated";

const Login = () => {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const altError = useSelector(selectGeneralAuthError);

  const error = useSelector(selectSigninError);

  const loading = useSelector(selectAuthLoading);

  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    
    dispatch(signinThunk({email, password}));
  };

  return (
    <IsAuthenticated>
      <div className={styles.wrapper}>
        <FormWrapper error={altError} header="BUBBLE" label="Log in to your Bubble account" onSubmit={handleLogin} loading={loading}>
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
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e)}
              error={error}
              autoComplete={'password'}
            />
            <TextButton title="Log In" />
            <TextNavButton to="/signup" text="Sign Up" />
        </FormWrapper>
      </div>
    </IsAuthenticated>
  );
};

export default Login;
