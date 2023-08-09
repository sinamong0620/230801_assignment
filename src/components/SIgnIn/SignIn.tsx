import styled from "styled-components";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const SignIn = () => {
  const [userId, setUserId] = useState<string>("");
  const [userPassword, setUserPassWord] = useState<string>("");
  const [cookies, setCookie] = useCookies();
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
  const onSubmitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //DOM 요소의 기본 동작을 막아줌
    //유효성검사
    if (userId.trim().length === 0 || userPassword.trim().length === 0) {
      return;
    }
    if (
      localStorage.getItem("useremail") === userId &&
      localStorage.getItem("userpassword") === userPassword
    ) {
      localStorage.setItem("isLoggedIn", "LOGGED_IN");
      setCookie("id", userId);
      setIsLoggedIn(true);
    } else {
      return;
    }
    setUserId("");
    setUserPassWord("");
  };
  const onChangeUserIdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };
  const onChangeUserPasswordHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserPassWord(e.target.value);
  };

  return (
    <LoginForm>
      {isLoggedIn && <h1>{`${cookies.id}님 환영합니다.`}</h1>}
      <form onSubmit={onSubmitFormHandler}>
        <label htmlFor="userid">아이디</label>
        <input
          onChange={onChangeUserIdHandler}
          type="text"
          value={userId}
          id="userid"
        />
        <label htmlFor="userpassword">비밀번호</label>
        <input
          onChange={onChangeUserPasswordHandler}
          type="password"
          value={userPassword}
          id="userpassword"
        />

        <button>로그인</button>
        <ul>
          <li>
            <a href="/">아이디 찾기</a>
          </li>
          <li>
            <a href="/">비밀번호 찾기</a>
          </li>
          <li>
            <a href="/signup">회원가입 하기</a>
          </li>
        </ul>
      </form>
    </LoginForm>
  );
};
export default SignIn;

const LoginForm = styled.div`
  form {
    width: 30%;
    margin: 15% auto;
    display: flex;
    flex-direction: column;
  }

  label {
    margin-bottom: 0.5em;
    display: flex;
    align-items: center;
  }

  input {
    margin-bottom: 2.5em;
    margin-right: 0.5em;
    padding: 1em;
    box-shadow: 0 0 0.3em lightgray;
    border: none;
    border-radius: 0.8em;
  }

  button {
    width: 100%;
    height: 3.8em;
    display: flex;
    padding: 1.5em;
    border: none;
    border-radius: 0.7em;
    background: black;
    color: white;
    justify-content: center;
    align-items: center;
    margin-bottom: 3em;
    cursor: pointer;
  }

  ul {
    width: 100%;
    display: flex;
    justify-content: center;
    color: dimgray;
    font-weight: 400;
  }
  li + li::before {
    content: "|";
    padding: 0 1em;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
`;
