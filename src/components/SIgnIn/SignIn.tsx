import styled from "styled-components";
import { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";
interface IProps {
  onSignUpValueHandler: (value: boolean) => void;
}
const SignIn = (props:IProps) => {
    const [userId, setUserId] =  useState<string>("");
    const [userPassword, setUserPassWord] =  useState<string>("");
    const [cookies,setCookie] = useCookies();
    //로그인 여부
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      const storedInformation = localStorage.getItem("isLoggedIn");
  
      if (storedInformation) {
        setIsLoggedIn(true);
        setUserId(cookies.id);
      }
    }, []);
    
    //로그인폼제출함수
    const onSubmitFormHandler = (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      //유효성검사
      if(userId.trim().length === 0 || userPassword.trim().length === 0) {
        return;
      }
      if(localStorage.getItem("id") === userId && localStorage.getItem("password") === userPassword){
        localStorage.setItem("isLoggedIn", "LOGGED_IN");
        setCookie("id",userId);
        setIsLoggedIn(true);
      }
      else{
        return;
      }
      setUserId("");
      setUserPassWord("");
    }
    const onChangeUserIdHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
      setUserId(e.target.value);
      console.log(userId);
    }
    const onChangeUserPasswordHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
      setUserPassWord(e.target.value);
      console.log(userPassword);
    }
  
    return (
      <LoginForm>
        {isLoggedIn&&<h1>{`${cookies.id}님 환영합니다.`}</h1>}
        <form onSubmit={onSubmitFormHandler}>
          <label htmlFor="userid">아이디</label>
          <input onChange={onChangeUserIdHandler} type="text" value={userId} id="userid"/>
          <label htmlFor="userpassword">비밀번호</label>
          <input onChange={onChangeUserPasswordHandler}type="password" value={userPassword} id="userpassword"/>
          
          <button>로그인</button>
          <button onClick={()=>{props.onSignUpValueHandler(true)}}>회원가입하기</button>
        </form>
      </LoginForm>
    );
}
export default SignIn;


const LoginForm = styled.div`

form{
  width : 40%;
  display:flex;
  flex-direction : column;
}

`;