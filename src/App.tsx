import React, { useState } from "react";
import SignIn from './components/SIgnIn/SignIn';
import SignUp from './components/SignUp/SignUp';

function App() {
  const [loginValue,setLoginValue] = useState(false);
  const signupValueHandler = (value:boolean) => {
    const SignInShow = (value ? true : false);
    setLoginValue(SignInShow);
  }
  return<>
    {!loginValue && <SignIn onSignUpValueHandler={signupValueHandler}/>}
    {loginValue && <SignUp onSignUpValueHandler={signupValueHandler}/>}
  </>;
}

export default App;

