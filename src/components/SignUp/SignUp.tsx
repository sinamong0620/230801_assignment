import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { styled } from "styled-components";
import CheckBox from "./CheckBox";
import DaumPostcodeEmbed from "react-daum-postcode";

interface IFormInput {
  name: string;
  email: string;
  address: string;
  detailAddress: string;
  password: string;
  passwordConfirm: string;
  phone: string;
  birth: string;
}
const SignUp = () => {
  const checkList = [
    {
      id: "1",
      value: "개인정보 수집 및 이용 동의 (필수)",
      required: true,
    },
    {
      id: "2",
      value: "이용약관동의(필수)",
      required: true,
    },
    {
      id: "3",
      value: "SNS정보 공개 동의(선택)",
      required: false,
    },
  ];
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>({ mode: "onChange" });

  //주소 모달창 띄우는 state
  const [openPostModalValue, setOpenPostModalValue] = useState<boolean>(false);
  const [checkedBox, setCheckedBox] = useState<string[]>([]);
  //주소모달창
  const openPostModalHandler = () => {
    setOpenPostModalValue((prev) => !prev);
  };
  //모두 동의합니다 체크박스
  const AllCheckBoxChekedHandler = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (target.checked) {
      setCheckedBox(checkList.map((item) => item.id));
    } else {
      setCheckedBox([]);
    }
  };
  //그냥 체크박스
  const CheckBoxcheckedHandler = (id: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckedBox((prev) => [...prev, id]); //불변성을 지키기 위한 원본 배열 복사 후 추가
    } else {
      setCheckedBox(
        checkedBox.filter((item) => {
          return item !== id;
        })
      );
    }
  };

  //제출했을때 이벤트 핸들러
  const onSubmitHandler: SubmitHandler<IFormInput> = (data) => {
    console.log("회원가입 됨");
    //로컬스토리지에 회원 이메일과 비밀번호 저장
    localStorage.setItem("useremail", getValues("email"));
    localStorage.setItem("userpassword", getValues("password"));
    //다시 로그인 화면으로 이동
    navigate("/");
  };
  return (
    <SignUpForm onSubmit={handleSubmit(onSubmitHandler)}>
      <h1>계정정보 입력</h1>
      <SignUpFormInput>
        <label htmlFor="name">이름</label>
        <input
          id="name"
          type="text"
          {...register("name", { required: "이름은 필수입니다." })}
        />
        {errors.name && <small>{errors.name.message}</small>}
      </SignUpFormInput>
      <SignUpFormInput>
        <label htmlFor="phone">전화번호</label>
        <input
          type="tel"
          id="phone"
          {...register("phone", {
            required: "'-'없이 입력해주세요. 예)01012341234",
          })}
        />
        {errors.phone && <small>{errors.phone.message}</small>}
      </SignUpFormInput>
      <SignUpFormInput>
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          {...register("password", {
            required: "비밀번호는 필수 입력입니다.",
            pattern: {
              value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/,
              message:
                "영어 대/소문자,숫자,특수문자를 조합해 비밀번호를 만들어주세요..",
            },
          })}
        />
        {errors.password && <small>{errors.password.message}</small>}
      </SignUpFormInput>
      <SignUpFormInput>
        <label htmlFor="passwordConfirm">비밀번호 확인</label>
        <input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "위의 비밀번호와 다릅니다.",
            validate: {
              passWordConfirm: (value) => {
                return (
                  value === getValues("password") || "위의 비밀번호와 다릅니다."
                );
              },
            },
          })}
        />
        {errors.passwordConfirm && (
          <small>{errors.passwordConfirm.message}</small>
        )}
      </SignUpFormInput>
      <SignUpFormInput>
        <label htmlFor="birth">생년월일</label>
        <input
          type="date"
          id="birth"
          placeholder="날짜 선택"
          {...register("birth", { required: "생년월일은 필수 입력입니다." })}
        ></input>
        {errors.birth && <small>{errors.birth.message}</small>}
      </SignUpFormInput>
      <SignUpFormInput>
        <label htmlFor="email">이메일</label>
        <input
          type="text"
          id="email"
          placeholder="이메일"
          {...register("email", {
            required: "이메일은 필수 입력입니다.",
            pattern: {
              value:
                /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/,
              message: "이메일 형식에 맞지 않습니다.",
            },
          })}
        />
        {errors.email && <small>{errors.email.message}</small>}
      </SignUpFormInput>
      <SignUpFormInput>
        <label htmlFor="address">주소</label>
        <button type="button" onClick={openPostModalHandler}>
          주소 검색
        </button>
        <input
          id="address"
          type="text"
          placeholder="주소"
          {...register("address", { required: "주소는 필수입니다." })}
          readOnly
        />
        <input
          id="detailAddress"
          type="text"
          placeholder="상세주소"
          {...register("detailAddress", { required: "상세주소는 필수입니다." })}
        />
      </SignUpFormInput>
      {openPostModalValue && (
        <DaumPostcodeEmbed
          autoClose={false}
          onComplete={({ address }) => {
            openPostModalHandler();
            setValue("address", address);
          }}
        ></DaumPostcodeEmbed>
      )}
      <SignUpFormInput>
        <label>
          <input
            type="checkbox"
            onChange={AllCheckBoxChekedHandler}
            checked={checkedBox.length === checkList.length ? true : false}
          />
          전체 동의
        </label>
        {checkList.map((checkList) => (
          <CheckBox
            key={checkList.id}
            id={checkList.id}
            CheckBoxcheckedHandler={CheckBoxcheckedHandler}
            checked={checkedBox.includes(checkList.id) ? true : false}
            required={checkList.required}
            value={checkList.value}
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
  small {
    color: red;
    font-weight: 400;
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
    margin-bottom: 1em;
    cursor: pointer;
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
  input[type="date"] {
    font-family: auto;
  }
  span {
    font-weight: 400;
  }
`;
