import React,{useState} from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import CheckBox from "./CheckBox";
import { styled } from "styled-components";
import useSignUp from "../../hooks/useBirthHandler";
import useValidation from "../../hooks/useValidation";
interface IProps {
    onSignUpValueHandler: (value: boolean) => void;
}
const SignUp = (props:IProps) => {
    const {years,months,days} = useSignUp();
    const [userInfo,setUserInfo] = useState({
        name : "",
        email : "",
        address : "",
        detailAddress : "",
        password:"",
        phone : "",
        year: "",
        month: "",
        day:"",
    });
    const { name,email,address,phone,password,detailAddress,year,month,day } = userInfo;
    const [openPostModalValue,setOpenPostModalValue] = useState<boolean>(false);
    const [checkedBox, setCheckedBox] = useState<string[]>([]);
    const datas = [{title:"흑흑 제발 동의 좀"},{title:"동의 그저 거저먹기입니다^^^.."}];

    const UserInfoChangeHandler = (e:React.FocusEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setUserInfo({...userInfo,[name]:value});
    }
    const UserInfoAddressChangeHandler = (address:string) => {
        setUserInfo({...userInfo,"address":address});
    }
    const SelectUserInfoChangeHandler = (e:React.ChangeEvent<HTMLSelectElement>) => {
        const { value, name } = e.target;
        setUserInfo({...userInfo,[name]:value});
    }
    //주소모달창
    const openPostModalHandler = () => {
        const value = (openPostModalValue ? false : true);
        setOpenPostModalValue(value);
    }
    //회원가입폼제출
    const SignUpFormSubmitHandler = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const value = useValidation(userInfo);

        if(!value){
            return;
        }
        else{
            props.onSignUpValueHandler(false);
            localStorage.setItem("id",email);
            localStorage.setItem("password",password);
        }

    }
    //모두 동의합니다 체크박스
    const AllCheckBoxChekedHandler = (checked:boolean) => {
       if(checked){
            const checkedItemArray:string[] = [];
            datas.forEach(data=>checkedItemArray.push(data.title));
            setCheckedBox(checkedItemArray);
       }
       else{
           setCheckedBox([]);
       }
    }
    //그냥 체크박스
    const CheckBoxcheckedHandler = (code:string,isChecked:boolean) => {
        if(isChecked){
            setCheckedBox([...checkedBox,code]);
        }
        else if(!isChecked && checkedBox.find(one => one === code)){
            const filter = checkedBox.filter(one=>one !== code);
            setCheckedBox([...filter]);
        }
    }
    
    return(
        <SignUpForm onSubmit={SignUpFormSubmitHandler}>

            <label htmlFor="name">이름</label>
            <input id="name" name="name" value={name} type="text" onChange={UserInfoChangeHandler}/>

            <label htmlFor="birth">생년월일</label>
            <select onChange={SelectUserInfoChangeHandler} name="year" value={year}>
                {years.map((date)=><option value={date}>{date}</option>)}
            </select>
            <select onChange={SelectUserInfoChangeHandler} name="month" value={month}> 
                {months.map((date)=><option value={date}>{date}</option>)}
            </select>
            <select onChange={SelectUserInfoChangeHandler} name="day" value={day}>
                {days.map((date)=><option value={date}>{date}</option>)}
            </select>

            <label htmlFor="phone">휴대폰번호</label>
            <input type="tel" id="phone" name="phone" placeholder="휴대전화번호" onChange={UserInfoChangeHandler} value={phone}/>

            <label htmlFor="email">이메일</label>
            <input type="text" id="email" name="email" placeholder="이메일" onChange={UserInfoChangeHandler} value={email} />

            <label htmlFor="password">비밀번호</label>
            <input type="password" id="password" name="password" placeholder="비밀번호" onChange={UserInfoChangeHandler} value={password}/>

            <label htmlFor="address">주소</label>
            <button type="button" onClick={openPostModalHandler}>주소 검색</button>
            <input id="address" name="address" type="text" placeholder="주소" value={address} onChange={UserInfoChangeHandler} readOnly/>
            <input id="detailAddress" name="detailAddress" type="text" placeholder="상세주소" value={detailAddress} onChange={UserInfoChangeHandler}/>

            <div>
                    <label>
                        <input type="checkbox" onChange={(e)=>{AllCheckBoxChekedHandler(e.target.checked)}} checked={checkedBox.length===2}/>모두 동의합니다.
                    </label>
                {datas.map((data)=><CheckBox data={data.title} checkedBox={checkedBox} CheckBoxcheckedHandler={CheckBoxcheckedHandler}/>)}
            </div>
            
            {openPostModalValue && <DaumPostcodeEmbed autoClose={false} onComplete={(event)=>{openPostModalHandler(); UserInfoAddressChangeHandler(event.address); }}></DaumPostcodeEmbed>}
            <button>회원가입하기</button>
        </SignUpForm>);
}
export default SignUp;

const SignUpForm = styled.form`    
    display: flex;
    flex-direction: column;
    width: 40%;

    label {
        margin-top : 1em;
    }
`;