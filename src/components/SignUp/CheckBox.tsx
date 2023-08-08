import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface IProps {
  data: string;
  checkedBox: string[];
  CheckBoxcheckedHandler: (code: string, isChecked: boolean) => void;
}
const CheckBox = (props: IProps) => {
  const [isCheckBox, setIsCheckBox] = useState<boolean>(false);
  const OnCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.CheckBoxcheckedHandler(event.target.value, event.target.checked);
    setIsCheckBox(event.target.checked);
  };

  useEffect(() => {
    if (props.checkedBox.includes(props.data)) {
      setIsCheckBox(true);
    } else {
      setIsCheckBox(false);
    }
  }, [props.checkedBox]);
  return (
    <SignUpAgreementInputCss>
      <label>
        <input
          type="checkbox"
          name="check"
          value={props.data}
          checked={isCheckBox}
          onChange={OnCheck}
          required
        />
        {props.data}
      </label>
      <img src="/image/next.png" width="25" alt="agreement" />
    </SignUpAgreementInputCss>
  );
};
export default CheckBox;

const SignUpAgreementInputCss = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 1em;
`;
