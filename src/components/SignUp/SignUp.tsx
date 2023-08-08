import React, { useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import CheckBox from "./CheckBox";
import { styled } from "styled-components";
import useValidation from "../../hooks/useValidation";
const SignUp = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    address: "",
    detailAddress: "",
    password: "",
    passwordConfirm: "",
    phone: "",
    year: "",
    month: "",
    day: "",
  });

  const {
    name,
    email,
    address,
    phone,
    password,
    passwordConfirm,
    detailAddress,
  } = userInfo;

  const [openPostModalValue, setOpenPostModalValue] = useState<boolean>(false);
  const [checkedBox, setCheckedBox] = useState<string[]>([]);
  const data = [
    { title: "개인정보 수집 및 이용 동의(필수)" },
    { title: "이용약관동의(필수)" },
  ];
  //유저 정보 이벤트 핸들러
  const UserInfoChangeHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };
  //유저 주소 이벤트 핸들러
  const UserInfoAddressChangeHandler = (address: string) => {
    setUserInfo({ ...userInfo, address: address });
  };
  //주소모달창
  const openPostModalHandler = () => {
    const value = openPostModalValue ? false : true;
    setOpenPostModalValue(value);
  };
  //회원가입폼제출
  const SignUpFormSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = useValidation(userInfo);

    if (!value) {
      return;
    } else {
      localStorage.setItem("id", email);
      localStorage.setItem("password", password);
    }
  };
  //모두 동의합니다 체크박스
  const AllCheckBoxChekedHandler = (checked: boolean) => {
    if (checked) {
      const checkedItemArray: string[] = [];
      data.forEach((data) => checkedItemArray.push(data.title));
      setCheckedBox(checkedItemArray);
    } else {
      setCheckedBox([]);
    }
  };
  //그냥 체크박스
  const CheckBoxcheckedHandler = (code: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckedBox([...checkedBox, code]);
    } else if (!isChecked && checkedBox.find((one) => one === code)) {
      const filter = checkedBox.filter((one) => one !== code);
      setCheckedBox([...filter]);
    }
  };

  return (
    <SignUpForm onSubmit={SignUpFormSubmitHandler}>
      <h1>계정정보 입력</h1>
      <SignUpFormInput>
        <label htmlFor="name">이름</label>
        <input
          id="name"
          name="name"
          value={name}
          type="text"
          onChange={UserInfoChangeHandler}
        />
      </SignUpFormInput>
      <SignUpFormInput>
        <label htmlFor="phone">전화번호</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          onChange={UserInfoChangeHandler}
          value={phone}
        />
        <span>'-'없이 입력해주세요. 예)01012341234</span>
      </SignUpFormInput>
      <SignUpFormInput>
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={UserInfoChangeHandler}
          value={password}
        />
        <span>
          영어 대/소문자,숫자,특수문자를 조합해 비밀번호를 만들어주세요.
        </span>
      </SignUpFormInput>
      <SignUpFormInput>
        <label htmlFor="password">비밀번호 확인</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={UserInfoChangeHandler}
          value={passwordConfirm}
        />
        <span>위에 입력한 비밀번호와 같은 비밀번호를 적어주세요.</span>
      </SignUpFormInput>
      {/* <label htmlFor="birth">생년월일</label>
      <select onChange={SelectUserInfoChangeHandler} name="year" value={year}>
        {years.map((date) => (
          <option value={date}>{date}</option>
        ))}
      </select>
      <select onChange={SelectUserInfoChangeHandler} name="month" value={month}>
        {months.map((date) => (
          <option value={date}>{date}</option>
        ))}
      </select>
      <select onChange={SelectUserInfoChangeHandler} name="day" value={day}>
        {days.map((date) => (
          <option value={date}>{date}</option>
        ))}
      </select> */}
      <SignUpFormInput>
        <label htmlFor="email">이메일</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="이메일"
          onChange={UserInfoChangeHandler}
          value={email}
        />
      </SignUpFormInput>
      <SignUpFormInput>
        <label htmlFor="address">주소</label>
        <button type="button" onClick={openPostModalHandler}>
          주소 검색
        </button>
        <input
          id="address"
          name="address"
          type="text"
          placeholder="주소"
          value={address}
          onChange={UserInfoChangeHandler}
          readOnly
        />
        <input
          id="detailAddress"
          name="detailAddress"
          type="text"
          placeholder="상세주소"
          value={detailAddress}
          onChange={UserInfoChangeHandler}
        />
      </SignUpFormInput>
      {openPostModalValue && (
        <DaumPostcodeEmbed
          autoClose={false}
          onComplete={(event) => {
            openPostModalHandler();
            UserInfoAddressChangeHandler(event.address);
          }}
        ></DaumPostcodeEmbed>
      )}
      <SignUpFormInput>
        <label>
          <input
            type="checkbox"
            onChange={(e) => {
              AllCheckBoxChekedHandler(e.target.checked);
            }}
            checked={checkedBox.length === 2}
          />
          전체 동의
        </label>
        {data.map((data) => (
          <CheckBox
            data={data.title}
            checkedBox={checkedBox}
            CheckBoxcheckedHandler={CheckBoxcheckedHandler}
          />
        ))}
      </SignUpFormInput>
      <button>회원가입하기</button>
    </SignUpForm>
  );
};
export default SignUp;

const SignUpForm = styled.form`
  padding: 2em 0;
  max-width: 30%;
  margin: 0 auto;
  font-weight: 900;
  color: dimgray;

  h1 {
    font-size: 1.8em;
    font-weight: 800;
    margin-bottom: 1em;
    color: black;
  }

  button {
    width: 100%;
    height: 3.8em;
    padding: 1.5em;
    border: none;
    border-radius: 0.7em;
    background: black;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const SignUpFormInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.4em;

  label {
    margin-bottom: 0.5em;
    display: flex;
    align-items: center;
  }

  input {
    margin-bottom: 0.7em;
    margin-right: 0.5em;
    padding: 1em;
    box-shadow: 0 0 0.3em lightgray;
    border: none;
    border-radius: 0.8em;
  }

  input[type="checkbox"] {
    width: 1.4em;
    height: 1.4em;
  }

  span {
    font-weight: 400;
  }
`;
