interface IProps {
  name: string;
  email: string;
  password: string;
  address: string;
  detailAddress: string;
  phone: string;
  year: string;
  month: string;
  day: string;
}
const useValidation = (props: IProps) => {
  const passwordRegEx = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
  const regEmail =
    /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

  if (
    props.name.trim().length === 0 ||
    props.email.match(regEmail) === null ||
    props.address.trim().length === 0 ||
    props.detailAddress.trim().length === 0 ||
    props.phone.trim().length === 0 ||
    props.password.match(passwordRegEx) === null ||
    props.year === "" ||
    props.month === "" ||
    props.day === ""
  ) {
    window.alert("회원가입 어림없지");
    return false;
  } else {
    return true;
  }
};
export default useValidation;
